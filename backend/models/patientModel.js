const mongoose = require('mongoose');


const patientSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
          require:true,  
        },
        gander: {
            type: String,
            require:true,  
        },
        email: {
            type: String,
            required: true, 
        },
        recommendation: {
            type: String,
            required: false,
        },
        report: {
            type: String,
            required: false,
        },
        medicines: {
            type: String,
            required: false,
        },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    
        },
        {
          timestamps: true,
        }


    
);
patientSchema.pre('save', function (next) {
    this.title = this.lastName+ " "+this.firstName+ " - "+this.id;
    next();
  });
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;