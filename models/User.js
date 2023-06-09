var knex = require("../database/connection");
var bcrypt = require("bcrypt");
class User {

async findAll(){
    try{
      var result =  await knex.select(["id", "email", "name", "role"]).table("users"); 
      return result;
    }catch (error){
        console.log(error);
        return [];
    }
    

}
async findById(id){
    try{
        var result =  await knex.select(["id", "email", "name", "role"]).where({id: id}).table("users"); 
        if(result.length > 0){
            return result[0];
        }else{
            return undefined;
        }
      }catch (error){
          console.log(error);
          return undefined;
      }

}

    async new(name, email, password) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ name, email, password: hash, role: 0 }).table("users");
        } catch (err) {
            console.log(err);
        }

    }
    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email });

            if (result.length > 0) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }

    }
}

module.exports = new User();
