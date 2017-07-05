/**
 * Created by tamar on 2017-07-05.
 */
(function(window){
    window.extractData = function() {
        var ret = $.Deferred();

        function onError() {
            console.log('Loading error', arguments);
            ret.reject();
        }

        function onReady(smart)  {
            if (smart.hasOwnProperty('patient')) {
                var patient = smart.patient;
                var pt = patient.read();

                $.when(pt).fail(onError);

                $.when(pt).done(function(patient) {
                    console.log("------------------");
                    console.log(patient);
                    console.log("--------------");
                    var patientID = "";
                    var dob = new Date(patient.birthDate).toDateString();
                    var fname = '';
                    var lname = '';

                    if (typeof patient.name[0] !== 'undefined') {
                        fname = patient.name[0].given.join(' ');
                        lname = patient.name[0].family.join(' ');
                    }

                    var p = defaultPatient();
                    p.birthdate = dob;
                    p.gender = gender;
                    p.fname = fname;
                    p.lname = lname;

                    ret.resolve(p);
                });
            } else {
                onError();
            }
        }

        FHIR.oauth2.ready(onReady, onError);
        return ret.promise();

    };

    function defaultPatient(){
        return {
            fname: {value: ''},
            lname: {value: ''},
            gender: {value: ''},
            birthdate: {value: ''}
        };
    }

    window.drawVisualization = function(p) {
        $('#holder').show();
        $('#loading').hide();
        $('#fname').html(p.fname);
        $('#lname').html(p.lname);
        $('#birthdate').html(p.birthdate);
    };

})(window);


/////
//_id, identifier, name, family, given, birthdate, phone, email, address-postalcode, gender
function getPatientInfo(){

};

function getContactInfo(){

};

function sendRemoteControlSurvey(patientID, fname, lname, dob){
    parameters = {
        "device_id": 1349,
        "survey_ids": [4073],
        "patient_id": "11111",
        "patient_checkin": {
            "new_entry": {
                "patient_id": patientID,
                "first_name": fname,
                "last_name": lname,
                "dob": dob,
                "client_status":  "Returning visit",
                "type_service":   "Primary Care"
            }
        }
    };

    $.ajax({
        url: 'https://alpha.tickitforhealth.com/api/v1/cernertest/commands/start-survey',
        type: 'post',
        headers: {
            'X-Passphrase-Token':   '',
            'Content-Type':         'application/json'
        },
        data: parameters,
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
};

function sendSMSSurvey(phoneNumber){

};

function retrieveReports(){

};