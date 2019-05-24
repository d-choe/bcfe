import { combineReducers } from 'redux';
import global_reducer from './global_reducer';
import gen_reducer from './gen_reducer';
import tem_reducer from './tem_reducer';
import cont_reducer from './cont_reducer';

export default combineReducers({
	global_data: global_reducer,
	gen_data: gen_reducer,
	tem_data: tem_reducer,
	cont_data: cont_reducer
});