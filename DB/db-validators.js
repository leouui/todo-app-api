const doesPropinSchema = (Schema,field,msg) => {
    return async(value) => {
        const model = await Schema.findOne({[field]:value})

        if(model) throw new Error(msg)
    }
}

module.exports = {doesPropinSchema}