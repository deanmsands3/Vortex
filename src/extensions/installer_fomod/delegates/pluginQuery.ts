import {IExtensionApi} from '../../../types/IExtensionContext';
import {log} from '../../../util/log';
import * as util from 'util';

export class Plugins {
  private mExtensionApi: IExtensionApi;

  constructor(api: IExtensionApi) {
    this.mExtensionApi = api;
  }

  public isActive = (pluginName: string): boolean => {
    log('info', 'isActive called', util.inspect(pluginName));
    let state = this.mExtensionApi.store.getState();

    if (state.loadOrder !== undefined) {
      log('info', 'isPresent debug state', util.inspect(pluginName));
      state.loadOrder.forEach((plugin) => {
      if ((plugin.key !== undefined) && (plugin.key.toLowerCase() === pluginName.toLowerCase())) {
          return plugin.enabled;
        }
      });
    }
    return false;
  }

  public isPresent = (pluginName: string): boolean => {
    log('info', 'isPresent called', util.inspect(pluginName));
    let state = this.mExtensionApi.store.getState();

    if (state.loadOrder !== undefined) {
      log('info', 'isPresent debug state', util.inspect(pluginName));
      state.loadOrder.forEach((plugin) => {
      if ((plugin.key !== undefined) && (plugin.key.toLowerCase() === pluginName.toLowerCase())) {
          return true;
        }
      });
    }
    return false;
  }

  public getAll = (isActiveOnly: boolean): string[] => {
    log('info', 'getAll called', util.inspect(isActiveOnly));
    let state = this.mExtensionApi.store.getState();

    if (state.loadOrder !== undefined) {
      log('info', 'getAll debug state', util.inspect(isActiveOnly));
      if (isActiveOnly === true) {
        return state.loadOrder.filter(plugin => plugin.enabled === true);
      } else {
        return state.loadOrder;
      }
    }

    return undefined;
  }
}

export default Plugins;
