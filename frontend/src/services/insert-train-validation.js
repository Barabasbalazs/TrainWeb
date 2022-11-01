import Joi from 'joi';

const schemaFrom = Joi.object({
    from: Joi.string()
        .required()
        .min(1)
        .pattern(/[A-Z]+[a-z]*/),    
});

const schemaTo = Joi.object({
    to: Joi.string()
        .required()
        .min(1)
        .pattern(/[A-Z]+[a-z]*/),
});

const schemaPrice = Joi.object({
    ticketprice: Joi.number()
        .greater(0)   
});

const validation = (state) => {
    if (schemaFrom.validate({from: state.from}).error) {
        return 'From';
    } else if (schemaTo.validate({to: state.to}).error) {
        return 'To';
    } else if (schemaPrice.validate({ticketprice: state.ticketprice}).error) {
        return 'Ticketprice';
    } else {
        return 'Ok';
    }
}



export default validation;