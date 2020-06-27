const SWITCH_PORT_4  =  require('./4_port_switch');
const SWITCH_PORT_6  =  require('./6_port_switch');
const SWITCH_PORT_8  =  require('./8_port_switch');
const SWITCH_PORT_12  =  require('./12_port_switch');
const DOOR_BUZZ = require('./door_buzz');
const TEMP_HUMI = require('./Temp_humi');
const TEMP_HUMI_PRESSURE = require('./Temp_Humi_Pressure');
const WATER_FLOW  = require('./water_flow');

module.exports  =  {
  SWITCH_PORT_4,
  SWITCH_PORT_6,
  SWITCH_PORT_8,
  SWITCH_PORT_12,
  DOOR_BUZZ,
  TEMP_HUMI,
  TEMP_HUMI_PRESSURE,
  WATER_FLOW
};
