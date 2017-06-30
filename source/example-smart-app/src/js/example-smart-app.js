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
        var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                      code: {
                        $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                              'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                              'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                      }
                    }
                  });
         var resource = {
             "resourceType": "DocumentReference",
             "id": "example",
             "text": {
                 "status": "generated",
                 "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>contained</b>: </p><p><b>masterIdentifier</b>: urn:oid:1.3.6.1.4.1.21367.2005.3.7</p><p><b>identifier</b>: urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234</p><p><b>subject</b>: <a>Patient/xcda</a></p><p><b>type</b>: Outpatient Note <span>(Details : {LOINC code '34108-1' = 'Outpatient Note', given as 'Outpatient Note'})</span></p><p><b>class</b>: History and Physical <span>(Details : {http://ihe.net/xds/connectathon/classCodes code 'History and Physical' = '??', given as 'History and Physical'})</span></p><p><b>author</b>: <a>Practitioner/xcda1</a>, id: a2; Gerald Smitty </p><p><b>custodian</b>: <a>Organization/organization-example</a></p><p><b>authenticator</b>: <a>Organization/organization-example</a></p><p><b>created</b>: 24/12/2005 9:35:00 AM</p><p><b>indexed</b>: 24/12/2005 9:43:41 AM</p><p><b>status</b>: current</p><p><b>docStatus</b>: preliminary <span>(Details : {http://hl7.org/fhir/composition-status code 'preliminary' = 'Preliminary', given as 'preliminary'})</span></p><h3>RelatesTos</h3><table><tr><td>-</td><td><b>Code</b></td><td><b>Target</b></td></tr><tr><td>*</td><td>appends</td><td><a>DocumentReference/example</a></td></tr></table><p><b>description</b>: Physical</p><p><b>securityLabel</b>: very restricted <span>(Details : {http://hl7.org/fhir/v3/Confidentiality code 'V' = 'very restricted', given as 'very restricted'})</span></p><h3>Contents</h3><table><tr><td>-</td><td><b>Attachment</b></td><td><b>Format</b></td></tr><tr><td>*</td><td/><td>History and Physical Specification (Details: urn:oid:1.3.6.1.4.1.19376.1.2.3 code urn:ihe:pcc:handp:2008 = '??', stated as 'History and Physical Specification')</td></tr></table><blockquote><p><b>context</b></p><p><b>encounter</b>: <a>Encounter/xcda</a></p><p><b>event</b>: Arm <span>(Details : {http://ihe.net/xds/connectathon/eventCodes code 'T-D8200' = '??', given as 'Arm'})</span></p><p><b>period</b>: 23/12/2004 8:00:00 AM --&gt; 23/12/2004 8:01:00 AM</p><p><b>facilityType</b>: Outpatient <span>(Details : {http://www.ihe.net/xds/connectathon/healthcareFacilityTypeCodes code 'Outpatient' = '??', given as 'Outpatient'})</span></p><p><b>practiceSetting</b>: General Medicine <span>(Details : {http://www.ihe.net/xds/connectathon/practiceSettingCodes code 'General Medicine' = '??', given as 'General Medicine'})</span></p><p><b>sourcePatientInfo</b>: <a>Patient/xcda</a></p><h3>Relateds</h3><table><tr><td>-</td><td><b>Identifier</b></td><td><b>Ref</b></td></tr><tr><td>*</td><td>urn:oid:1.3.6.1.4.1.21367.2005.3.7.2345</td><td><a>Patient/xcda</a></td></tr></table></blockquote></div>"
             },
             "contained": [
                 {
                     "resourceType": "Practitioner",
                     "id": "a2",
                     "name": [
                         {
                             "family": [
                                 "Smitty"
                             ],
                             "given": [
                                 "Gerald"
                             ]
                         }
                     ],
                     "role": [
                         {
                             "organization": {
                                 "display": "Cleveland Clinic"
                             },
                             "code": {
                                 "text": "Attending"
                             },
                             "specialty": [
                                 {
                                     "text": "Orthopedic"
                                 }
                             ]
                         }
                     ]
                 }
             ],
             "masterIdentifier": {
                 "system": "urn:ietf:rfc:3986",
                 "value": "urn:oid:1.3.6.1.4.1.21367.2005.3.7"
             },
             "identifier": [
                 {
                     "system": "urn:ietf:rfc:3986",
                     "value": "urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"
                 }
             ],
             "subject": {
                 "reference": "Patient/xcda"
             },
             "type": {
                 "coding": [
                     {
                         "system": "http://loinc.org",
                         "code": "34108-1",
                         "display": "Outpatient Note"
                     }
                 ]
             },
             "class": {
                 "coding": [
                     {
                         "system": "http://ihe.net/xds/connectathon/classCodes",
                         "code": "History and Physical",
                         "display": "History and Physical"
                     }
                 ]
             },
             "author": [
                 {
                     "reference": "Practitioner/xcda1"
                 },
                 {
                     "reference": "#a2"
                 }
             ],
             "custodian": {
                 "reference": "Organization/organization-example"
             },
             "authenticator": {
                 "reference": "Organization/organization-example"
             },
             "created": "2005-12-24T09:35:00+11:00",
             "indexed": "2005-12-24T09:43:41+11:00",
             "status": "current",
             "docStatus": {
                 "coding": [
                     {
                         "system": "http://hl7.org/fhir/composition-status",
                         "code": "preliminary",
                         "display": "preliminary"
                     }
                 ]
             },
             "relatesTo": [
                 {
                     "code": "appends",
                     "target": {
                         "reference": "DocumentReference/example"
                     }
                 }
             ],
             "description": "Physical",
             "securityLabel": [
                 {
                     "coding": [
                         {
                             "system": "http://hl7.org/fhir/v3/Confidentiality",
                             "code": "V",
                             "display": "very restricted"
                         }
                     ]
                 }
             ],
             "content": [
                 {
                     "attachment": {
                         "contentType": "application/hl7-v3+xml",
                         "language": "en-US",
                         "url": "http://example.org/xds/mhd/Binary/07a6483f-732b-461e-86b6-edb665c45510",
                         "size": 3654,
                         "hash": "2jmj7l5rSw0yVb/vlWAYkK/YBwk="
                     },
                     "format": [
                         {
                             "system": "urn:oid:1.3.6.1.4.1.19376.1.2.3",
                             "code": "urn:ihe:pcc:handp:2008",
                             "display": "History and Physical Specification"
                         }
                     ]
                 }
             ],
             "context": {
                 "encounter": {
                     "reference": "Encounter/xcda"
                 },
                 "event": [
                     {
                         "coding": [
                             {
                                 "system": "http://ihe.net/xds/connectathon/eventCodes",
                                 "code": "T-D8200",
                                 "display": "Arm"
                             }
                         ]
                     }
                 ],
                 "period": {
                     "start": "2004-12-23T08:00:00+11:00",
                     "end": "2004-12-23T08:01:00+11:00"
                 },
                 "facilityType": {
                     "coding": [
                         {
                             "system": "http://www.ihe.net/xds/connectathon/healthcareFacilityTypeCodes",
                             "code": "Outpatient",
                             "display": "Outpatient"
                         }
                     ]
                 },
                 "practiceSetting": {
                     "coding": [
                         {
                             "system": "http://www.ihe.net/xds/connectathon/practiceSettingCodes",
                             "code": "General Medicine",
                             "display": "General Medicine"
                         }
                     ]
                 },
                 "sourcePatientInfo": {
                     "reference": "Patient/xcda"
                 },
                 "related": [
                     {
                         "identifier": {
                             "system": "urn:ietf:rfc:3986",
                             "value": "urn:oid:1.3.6.1.4.1.21367.2005.3.7.2345"
                         },
                         "ref": {
                             "reference": "Patient/xcda"
                         }
                     }
                 ]
             }
         };

         smart.patient.api.create({resource: resource}).done(function(r){
          var document = r.data;
          smart.patient.api.update({resource: document}).done(function(res){
            console.log(r.data);
          });
         });

        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient, obv) {
          console.log("------------------");
          console.log(patient);
          console.log("--------------");
          console.log(obv);
          var byCodes = smart.byCodes(obv, 'code');
          var gender = patient.gender;
          var dob = new Date(patient.birthDate);
          var day = dob.getDate();
          var monthIndex = dob.getMonth() + 1;
          var year = dob.getFullYear();

          var dobStr = monthIndex + '/' + day + '/' + year;
          var fname = '';
          var lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ');
            lname = patient.name[0].family.join(' ');
          }

          var height = byCodes('8302-2');
          var systolicbp = getBloodPressureValue(byCodes('55284-4'),'8480-6');
          var diastolicbp = getBloodPressureValue(byCodes('55284-4'),'8462-4');
          var hdl = byCodes('2085-9');
          var ldl = byCodes('2089-1');

          var p = defaultPatient();
          p.birthdate = dobStr;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.age = parseInt(calculateAge(dob));
          p.height = getQuantityValueAndUnit(height[0]);

          if (typeof systolicbp != 'undefined')  {
            p.systolicbp = systolicbp;
          }

          if (typeof diastolicbp != 'undefined') {
            p.diastolicbp = diastolicbp;
          }

          p.hdl = getQuantityValueAndUnit(hdl[0]);
          p.ldl = getQuantityValueAndUnit(ldl[0]);

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
      age: {value: ''},
      height: {value: ''},
      systolicbp: {value: ''},
      diastolicbp: {value: ''},
      ldl: {value: ''},
      hdl: {value: ''},
    };
  }

  function getBloodPressureValue(BPObservations, typeOfPressure) {
    var formattedBPObservations = [];
    BPObservations.forEach(function(observation){
      var BP = observation.component.find(function(component){
        return component.code.coding.find(function(coding) {
          return coding.code == typeOfPressure;
        });
      });
      if (BP) {
        observation.valueQuantity = BP.valueQuantity;
        formattedBPObservations.push(observation);
      }
    });

    return getQuantityValueAndUnit(formattedBPObservations[0]);
  }

  function isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
  }

  function calculateAge(date) {
    if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
      var d = new Date(date), now = new Date();
      var years = now.getFullYear() - d.getFullYear();
      d.setFullYear(d.getFullYear() + years);
      if (d > now) {
        years--;
        d.setFullYear(d.getFullYear() - 1);
      }
      var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
      return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
    }
    else {
      return undefined;
    }
  }

  function getQuantityValueAndUnit(ob) {
    if (typeof ob != 'undefined' &&
        typeof ob.valueQuantity != 'undefined' &&
        typeof ob.valueQuantity.value != 'undefined' &&
        typeof ob.valueQuantity.unit != 'undefined') {
          return ob.valueQuantity.value + ' ' + ob.valueQuantity.unit;
    } else {
      return undefined;
    }
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
    $('#gender').html(p.gender);
    $('#birthdate').html(p.birthdate);
    $('#age').html(p.age);
    $('#height').html(p.height);
    $('#systolicbp').html(p.systolicbp);
    $('#diastolicbp').html(p.diastolicbp);
    $('#ldl').html(p.ldl);
    $('#hdl').html(p.hdl);
  };

})(window);
