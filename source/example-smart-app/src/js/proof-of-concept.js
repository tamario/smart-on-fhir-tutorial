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
                    var patientIDs = patient.identifier;
                    var patientID = "";
                    patientIDs.forEach(function(id){
                        if(id.type.text == "MRN"){
                            patientID = id.value;
                            console.log(patientID);
                        }
                    });
                    var gender = patient.gender;
                    var dob = patient.birthDate;
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
                    p.patientID = patientID;

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
            birthdate: {value: ''},
            patientID: {value: ''}
        };
    }

    window.drawVisualization = function(p) {
        $('#holder').show();
        $('#loading').hide();
        $('#fname').val(p.fname.toString());
        $('#lname').val(p.lname.toString());
        $('#birthdate').val(p.birthdate.toString());
        $('#patientID').val(p.patientID.toString());
    };

})(window);

function sendRemoteControlSurvey(patientID, fname, lname, dob, clientStatus, service){
    parameters = {
        "device_id": 1349,
        "survey_ids": [4073],
        "set_patient_id": patientID,
        "patient_checkin": {
            "new_entry": {
                "patient_id": patientID,
                "first_name": fname,
                "last_name": lname,
                "dob": dob,
                "client_status":  clientStatus,
                "type_service":   service
            }
        }
    };

    console.log(parameters);

    $.ajax({
        url: 'https://alpha.tickitforhealth.com/api/v1/cernertest/commands/start-survey',
        type: 'post',
        headers: {
            'X-Passphrase-Token':   'a78dd911-6852-4cd0-920a-d8480d1375ec',
            'Content-Type':         'application/json'
        },
        data: JSON.stringify(parameters),
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
};
