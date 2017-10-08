/**
 *	hometrack.js - express middleware functions for coding test
 */

module.exports = {
	filter: function(req, res, next){
		var response = [];

		if(!(req.body.payload instanceof Array)){
			var err = new Error();
    		err.status = 400;
    		err.message = "invalid payload";
			next(err);
		}

		req.body.payload.forEach(function(property, i){
			if(property.type == "htv" && property.workflow == "completed"){

				response.push({
					concataddress: [property.address.buildingNumber, 
						property.address.street, 
						property.address.suburb,
						property.address.state,
						property.address.postcode].join(" "),
					type: property.type,
					workflow: property.workflow
				});
			}
		});
		res.json({response:response});
	},
	jsonError: function(err, req, res, next){
		
		if(err instanceof SyntaxError){
			res.status(400);
		    res.json({
			    error: "Could not decode request: JSON parsing failed"
			});
		}else{
			next();
		}
	}
}