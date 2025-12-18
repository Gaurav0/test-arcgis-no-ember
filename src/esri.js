import esriConfig from '@arcgis/core/config.js';
import * as intl from '@arcgis/core/intl.js';
import { setAssetPath } from '@arcgis/map-components/dist/components';

export default class EsriService {
  esriToken = process.env.ARCGIS_TOKEN;

  constructor() {
    const self = this;

    esriConfig.assetsPath = window.location.origin + '/assets';
    setAssetPath(esriConfig.assetsPath);
    intl.setLocale('en');

    const interceptor = {
      before(params) {
        params.requestOptions.query = self._setDefaultParams(
          params.requestOptions.query ?? {}
        );
        return params;
      },
    };

    esriConfig.request.interceptors.push(interceptor);
  }

  _setDefaultParams(params) {
    params.f = params.f || 'json';
    params.outSr = params.outSr || 4326;
    params.language = params.language || 'en';

    if (this.esriToken) {
      params.token = this.esriToken;
    }
    return params;
  }
}
