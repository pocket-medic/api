const momentjs = require('moment');

const STATUS = {
  SANATOS_METABOLIC: 'Sanatos metabolic',
  SINDROM_METABOLIC: 'Sindrom metabolic'
};

class siMS {
  constructor(data) {
    this.data = data;

    this.gender = data.sex === 'm' ? 'male' : 'female';
    this.familyHistoryOfCardioIncident = data.familyHistoryOfCardioIncident ? 1.2 : 1;

    this.ref = {
      waist: {
        male: 102,
        female: 88
      },
      glycemia: 5.6,
      triglyceride: 1.7,
      systolicBloodPressure: 130,
      hdlCholesterol: {
        male: 1.02,
        female: 1.28
      }
    };

    const siMSReferenceScore = this.calculateSiMSScore(Object.assign({}, data, {
      waist: this.ref.waist[this.gender],
      glycemia: this.ref.glycemia,
      triglyceride: this.ref.triglyceride,
      systolicBloodPressure: this.ref.systolicBloodPressure,
      hdlCholesterol: this.ref.hdlCholesterol[this.gender]
    }));

    const simsPatient = this.calculateSiMSScore(data);

    const siMSRiskScoreReference = this.calculateSiMSRiskScore(Object.assign({}, data, {
      waist: this.ref.waist[this.gender],
      glycemia: this.ref.glycemia,
      triglyceride: this.ref.triglyceride,
      systolicBloodPressure: this.ref.systolicBloodPressure,
      hdlCholesterol: this.ref.hdlCholesterol[this.gender]
    }), siMSReferenceScore);
    const siMSRiskPatiente = this.calculateSiMSRiskScore(data, simsPatient);
    const psiMSScore = this.calculatePsiMSScore();
    this.score = {
      ref: {
        siMS: Math.round(siMSReferenceScore * 100) / 100,
        siMSRisk: Math.round(siMSRiskScoreReference * 100) / 100
      },
      patient: {
        siMS: Math.round(simsPatient * 100) / 100,
        siMSRisk: Math.round(siMSRiskPatiente * 100) / 100,
        PsiMSScore: Math.round(psiMSScore * 100) / 100
      }
    };
    this.status = this.score.patient.siMS > this.score.ref.siMS ? STATUS.SINDROM_METABOLIC : STATUS.SANATOS_METABOLIC;
  }


  calculateSiMSScore(data) {
    const {gender, ref} = this;
    const {height, triglyceride, systolicBloodPressure} = data;
    const waist = data.waist[gender] || data.waist;
    const hdlCholesterol = data.hdlCholesterol[gender] || data.hdlCholesterol;
    
    let glycemia;

    if (Array.isArray(data.glycemia)) {
      glycemia =  data.glycemia[data.glycemia.length - 1] && data.glycemia[data.glycemia.length - 1].value;
    } else {
      glycemia = data.glycemia;
    }

    const result = (((2 * waist) / height) + 
    (glycemia / ref.glycemia) + 
    (triglyceride / ref.triglyceride) +
    (systolicBloodPressure / ref.systolicBloodPressure) - 
    (hdlCholesterol / ref.hdlCholesterol[gender]));

    return result;
  }

  calculatePsiMSScore() {
    const {data, ref} = this;
    const {height, triglyceride, systolicBloodPressure, waist, hdlCholesterol} = data;
    const glycemia = data.glycemia[data.glycemia.length - 1] && data.glycemia[data.glycemia.length - 1].value;

    const result = (((2 * waist) / height) + 
    (glycemia / ref.glycemia) + 
    (triglyceride / ref.triglyceride) +
    (systolicBloodPressure / ref.systolicBloodPressure) - 
    (hdlCholesterol / 1.02));

    return result;
  }

  calculateSiMSRiskScore(data, siMSScore) {
    siMSScore = Math.round(siMSScore * 100) / 100;
    const age = momentjs().diff(data.dob, 'years');
    const genderVariable = this.gender === 'male' ? 45 : 50;
    const {familyHistoryOfCardioIncident} = this;
    return (
      siMSScore * (age / genderVariable) * familyHistoryOfCardioIncident
    );
  }
}

module.exports = siMS;