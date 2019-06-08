// patient-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const ObjectId = mongooseClient.Schema.Types.ObjectId;

  const { Schema } = mongooseClient;
  const patient = new Schema({
    userId: { type: ObjectId, required: true, ref: 'users'},
    dob: { type: Date},
    sex: { type: String },
    weight: { type: Number },
    height: { type: Number },
    waist: { type: Number },
    glycemia: { type: Number },
    triglyceride: { type: Number },
    cholesterol: { type: Number },
    systolicBloodPressure: { type: Number },
    familyHistoryOfCardioIncident: { type: Boolean }
  }, {
    timestamps: true
  });

  return mongooseClient.model('patient', patient);
};
