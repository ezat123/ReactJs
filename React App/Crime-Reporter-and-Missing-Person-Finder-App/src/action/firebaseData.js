import actionTypes from '../Reducers/actionTypes'
import * as firebase from 'firebase';


export function MySatatusAction(newStatus) {

    return dispatch => {
       
        var user = firebase.auth().currentUser;
        firebase.database().ref('Complaints/').on('child_added', (data) => {
            let obj = data.val();
            //  obj.id = data.key;
            let complaint = newStatus.ComplaintsStatus;
            let Crime = newStatus.crimeStatus;
            let Missing = newStatus.missingStatus;

            if (obj.uId === user.uid) {
                if (obj.crimeType === 'Complaint Against') {
                    complaint = complaint.concat(obj);
                    // console.log('complaintAgainst', complaint);
                    dispatch(MySatatusOfComplaints(complaint))
                }
                else if (obj.crimeType === 'Crime Report') {
                    Crime = Crime.concat(obj);
                    dispatch(MySatatusOfCrime(Crime))
                }
                else if (obj.crimeType === 'Missing Report') {
                    Missing = Missing.concat(obj);
                    // console.log('Missing', Missing)
                    dispatch(MySatatusOfMissing(Missing))
                }
            }


            //Last states
            dispatch(AllSatatusType([]))
        })
    }
}
export function AllSatatusAction(AllData) {
    return dispatch => {
        firebase.database().ref('Complaints/').once('value', (data) => {
            let obj = data.val();
            // console.log('All firebase data', obj.crimeType);
            
            // let Allcomplaint = AllData.AllStatus;

            // // console.log('all data array', Allcomplaint);
            // Allcomplaint = Allcomplaint.concat(obj)
            // console.log('all data array', Allcomplaint);
            
            dispatch(AllSatatusType(obj))
            //Last states
            dispatch(MySatatusOfComplaints([]))
            dispatch(MySatatusOfCrime([]))
            dispatch(MySatatusOfMissing([]))
        })
    }
}

export function AllSatatusActionForComperison(keys) {
    return dispatch => {
        firebase.database().ref('Complaints/').on('child_added', (data) => {
            let obj = data.val();
            obj.objKey = data.key;
            // console.log('my firebase data --------', obj);
            if(keys === obj.objKey && obj.crimeType === 'Complaint Against'){
                // console.log("find it00000000", obj);
                dispatch(DisplayAllDataDispatch(obj))
            }
            if(keys === obj.objKey && obj.crimeType === 'Crime Report'){
                // console.log("find it00000000", obj);
                dispatch(DisplayAllDataDispatch(obj))
            }
            if(keys === obj.objKey && obj.crimeType === 'Missing Report'){
                // console.log("find it00000000", obj);
                dispatch(DisplayAllDataDispatch(obj))
            }

        })
    }
}



// for DisplayAllData
function DisplayAllDataDispatch(payload){
    return{
        type: actionTypes.DisplayAllData,
        payload
    }
}

function MySatatusOfComplaints(payload) {
    return {
        type: actionTypes.ObjectOfComplaintsData,
        payload
    }
}
function MySatatusOfCrime(payload) {
    return {
        type: actionTypes.ObjectOfCrimeData,
        payload
    }
}
function MySatatusOfMissing(payload) {
    return {
        type: actionTypes.ObjectOfMissingData,
        payload
    }
}

function AllSatatusType(payload) {
    return {
        type: actionTypes.AllStatusFire,
        payload
    }
}