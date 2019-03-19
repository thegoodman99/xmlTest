var expect = require('chai').expect;
var testData = require('../parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let allergySection = components[0].structuredBody.component[2].section;
let fillerData = mappingSection.text.Container;

describe('CCD1.1', function () {
  describe('allergySection', function() {
    describe('templateId tag', function() {
        it('should have the correct root attribute for the templateid tags', function () {
            let templateId1 = allergySection.templateId[0]._attributes.root;
            expect(templateId1).to.be.equal('2.16.840.1.113883.10.20.22.2.6.1', 'The templateId1 root attribute does not match!');
            let templateId2 = allergySection.templateId[1]._attributes.root;
            expect(templateId2).to.be.equal('2.16.840.1.113883.10.20.22.2.6', 'The templateId2 root attribute does not match!');
        });
    }); // End of templateID tag
    describe('code tag', function() {
        it('should have the correct code attribute for the code tag', function(){
            let code = allergySection.code._attributes.code;
            expect(code).to.be.equal('48765-2', 'The code tags code attribute does not match!');
        });
        it('should have the correct displayName attribute for the code tag', function(){
            let displayName = allergySection.code._attributes.displayName;
            expect(displayName).to.be.equal('Allergies, adverse reactions, alerts', 'The code tags displayName attribute does not match!');
        });
        it('should have the correct codeSystem attribute for the code tag', function(){
            let codeSystem = allergySection.code._attributes.codeSystem;
            expect(codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The code tags codeSystem attribute does not match!');
        });
        it('should have the correct codeSystemName attribute for the code tag', function(){
            let codeSystemName = allergySection.code._attributes.codeSystemName;
            expect(codeSystemName).to.be.equal('LOINC', 'The code tags codeSystemName attribute does not match!');
        });
    }); // End of Code Tag
    describe('title tag', function() {
        it('should have the correct text in the title tag', function () {
            let title = allergySection.title._text;
            expect(title).to.be.equal('Allergies Section', 'The text in the title tag does not match!');
        });
    }); // End of title tag
    describe('text/paragraph tag', function() {
        it('should have the correct text in the text/paragraph tag', function () {
            let paragraph = allergySection.text.paragraph._text;
            expect(paragraph).to.be.equal('This section includes Allergies on record with VA for the patient. The data comes from all VA treatment facilities. It does not list allergies that were removed or entered in error. Some allergies may also be reported in the Immunization section.', 'The text in the text/paragraph tag does not match!');
        });
    }); // end of paragraph tag

    // ASSESSMENT TEXT TEST NEEDED
    
    describe('allergy problem act code', function() {
      it('should have the correct code attribute for the allergy problem act code', function(){
        let code = allergySection.entry[0].act.code._attributes.code;
        expect(code).to.be.equal('48765-2', 'The allergy problem act code attribute does not match!');
      });

      it('should have the correct codeSystem attribute for the allergy problem act code', function(){
        let codeSystem = allergySection.code._attributes.codeSystem;
        expect(codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The allergy problem act codeSystem attribute does not match!');
      });

      it('should have the correct codeSystemName attribute for the allergy problem act code', function(){
        let codeSystemName = allergySection.entry[0].act.code._attributes.codeSystemName;
        expect(codeSystemName).to.be.equal('LOINC', 'The allergy problem act codeSystemName attribute does not match!');
      });

      it('should have the correct displayName attribute for the allergy problem act code', function(){
        let displayName = allergySection.entry[0].act.code._attributes.displayName;
        expect(displayName).to.be.equal('Allergies, adverse reactions, alerts', 'The allergy problem act displayName attribute does not match!');
      });

    }); // End of allergy problem act code

    describe('allergy problem act status code', function() {
      it('should have the correct code attribute for the allergy problem act code', function(){
        let statusCode = allergySection.entry[0].act.statusCode._attributes.code;
        expect(statusCode).to.be.equal('active', 'The allergy problem act statusCode attribute does not match!');
      });
    }); // End of allergy problem act status code

    // TEST NEEDED FOR allergy problem concern act effective time

    // Information Source for Allergy
    describe('Information Source for Allergy', function() {
      // author id
      it('should have the correct code attribute for the author id', function(){
        let authorID = allergySection.entry[0].act.author.assignedAuthor.id._attributes.nullFlavor;
        expect(authorID).to.be.equal('NI', 'The author id attribute does not match!');
      }); 

      // represented Organization
      describe('Represented Organization', function() {
        
        // id -root
        it('should have the correct code attribute for the represented Organization id root', function(){
          let facilityNumber = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.id._attributes.root;
          expect(facilityNumber).to.be.equal('2.16.840.1.113883.4.349', 'The represented Organization id attribute root does not match!');
        }); 

        //id -extension
        it('should have the correct code attribute for the represented Organization id extension', function(){
          let facilityNumber = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.id._attributes.extension;
          let extension = fillerData.Encounters.Encounter[0].HealthCareFacility.Code._text;
          expect(facilityNumber).to.be.equal((extension), `The represented Organization id ${facilityNumber} attribute extension does not match ${extension}!`);
        });

        //Organization Name
        it('should have the correct code attribute for the represented Organization Name', function(){
          let facilityName = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.name._text;
          let fillerName = fillerData.Encounters.Encounter[0].EnteredAt.Description._text;
          expect(facilityName).to.be.equal((fillerName), `The represented Organization Name ${facilityName} attribute fillerName does not match ${fillerName}!`);
        });
      }); // end of represented Organization

      // Allergy Intolerance Obsevation 
      describe('Allergy Intolerance Obsevation', function() {

        // entryRelationship
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entryRelationship', function(){
          let entryRelationship = allergySection.entry[0].act.entryRelationship._attributes.typeCode;
          expect(entryRelationship).to.be.equal('SUBJ', `The Allergy Intolerance Obsevation entryRelationship attribute code does not match!`);
        });

        // classCode
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entry classCode', function(){
          let classCode = allergySection.entry[0].act.entryRelationship.observation._attributes.classCode;
          expect(classCode).to.be.equal('OBS', `The Allergy Intolerance Obsevation entry classCode attribute code does not match!`);
        });

        // moodCode
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entry moodCode', function(){
          let moodCode = allergySection.entry[0].act.entryRelationship.observation._attributes.moodCode;
          expect(moodCode).to.be.equal('EVN', `The Allergy Intolerance Obsevation entry moodCode attribute code does not match!`);
        });

        // templateId
        it('should have the correct code attribute for the Allergy observation templateId', function(){
          let templateIdRoot = allergySection.entry[0].act.entryRelationship.observation.templateId._attributes.root;
          expect(templateIdRoot).to.be.equal('2.16.840.1.113883.10.20.22.4.7', `The Allergy Obsevation templateId attribute root code does not match!`);
        });
      }); // end of Allergy Intolerance Obsevation 

      // Allergy observation id
      describe('Allergy Intolerance Obsevation', function() {

        // id
        it('should have the correct code attribute for the Allergy observation id', function(){
          let id = allergySection.entry[0].act.entryRelationship.observation.id._attributes.nullFlavor;
          expect(id).to.be.equal('UNK', `The Allergy Obsevation id attribute code does not match!`);
        });

        // code
        it('should have the correct code attribute for the Allergy observation code', function(){
          let code = allergySection.entry[0].act.entryRelationship.observation.code._attributes.code;
          expect(code).to.be.equal('ASSERTION', `The Allergy Obsevation code attribute code does not match!`);
        });

        // codeSystems
        it('should have the correct code attribute for the Allergy observation codeSystems', function(){
          let codeSystem = allergySection.entry[0].act.entryRelationship.observation.code._attributes.codeSystem;
          expect(codeSystem).to.be.equal('2.16.840.1.113883.5.4', `The Allergy Obsevation code attribute codeSystem does not match!`);
        });

        // status code
        it('should have the correct code attribute for the Allergy observation statusCode', function(){
          let statusCode = allergySection.entry[0].act.entryRelationship.observation.statusCode._attributes.code;
          expect(statusCode).to.be.equal('completed', `The Allergy Obsevation code attribute statusCode does not match!`);
        });

        // have questions still need to work on this test
          // codeSystem
          // displayName
      }); // end of allergy observation code

      // Adverse Event Date ... Needs tests

      // Adverse Event Type ... Needs tests

      

       // Product & Product Detail
      describe('Product & Product Detail', function() {

        // typeCode
        it('should have the correct code attribute for the product & product participant typeCode', function(){
          let typeCode = allergySection.entry[0].act.entryRelationship.observation.participant._attributes.typeCode;
          expect(typeCode).to.be.equal('CSM', `The Product & Product particpant attribute typeCode does not match!`);
        });

        // classCode
        it('should have the correct code attribute for the product & product participantRole classCode', function(){
          let classCode = allergySection.entry[0].act.entryRelationship.observation.participant.participantRole._attributes.classCode;
          expect(classCode).to.be.equal('MANU', `The Product & Product participantRole classCode attribute classCode does not match!`);
          });

        // classCode
        it('should have the correct code attribute for the product & product detail playingEntity classCode', function(){
          let classCode = allergySection.entry[0].act.entryRelationship.observation.participant.participantRole.playingEntity._attributes.classCode;
          expect(classCode).to.be.equal('MMAT', `The Product & Product code attribute playingEntity classCode does not match!`);
          });

      }); // end of product & Product Detail



    }); // end of Information Source for Allergy

  });
});


