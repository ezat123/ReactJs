// import {handleActions} from 'redux-actions';
import actionTypes from './actionTypes';

const StatusReducer = (state = {
    MyStatus:[],
    ComplaintsStatus:[],
    crimeStatus:[],
    missingStatus:[],
    // AllStatus:[],

} , action) => {
    switch(action.type){
      case actionTypes.MyStatusFire:{
          return state={
              ...state,
              MyStatus: action.payload
          };
      }
      case actionTypes.AllStatusFire:{
          return state={
              ...state,
              AllStatus: action.payload
          };
      }
      case actionTypes.ObjectOfComplaintsData:{
          return state={
              ...state,
              ComplaintsStatus: action.payload
          };
      }
      case actionTypes.ObjectOfCrimeData:{
          return state={
              ...state,
              crimeStatus: action.payload
          };
      }
      case actionTypes.ObjectOfMissingData:{
          return state={
              ...state,
              missingStatus: action.payload
          };
      }
    //   case actionTypes.ReSetArrays:{
    //       return state={
    //           ...state,
    //           ComplaintsStatus: action.payload
    //       };
    //   }
    }
    return state;
}
export default StatusReducer;