import { GatewayMessageCreateDispatchData } from 'discord-api-types/v10';
import config from '../config';

export const isMommy = (message: GatewayMessageCreateDispatchData) => message.author.id == config.mom;
export const isMemberMod = (message: GatewayMessageCreateDispatchData) => message.member!.roles.includes(config.roles.mod);
export const isMemberModOrHelper = (message: GatewayMessageCreateDispatchData) =>
       message.member!.roles.includes(config.roles.mod)
    || message.member!.roles.includes(config.roles.helper);

