const moment = require('moment')


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



const collect_fquency_by_five = (string,array) => {
      let string_array = string.split(" ")
      string_array.forEach( number => {
         if (number < 10) {
            number = number.slice(1) 
            array[number]++ 
         }
         else {
            array[number]++ 
         }
      })
}

const collect_fquency_by_powerball = (number, array) =>  {      
       if (number < 10) {
           number = number.slice(1) 
           array[number]++ 
     }
       else if (number )
       {
           array[number]++ 
     }
}

const collect_fquency_by_megaball = (number, array) =>  {      
      if (number < 10) {
          number = number.slice(1) 
          array[number]++ 
    }
      else if (number )
      {
          array[number]++ 
    }
}

const zerofy = (number) => {
              let string_number = JSON.stringify(number)
              if ( string_number < 10 ){  return string_number = '0' +  string_number } 
              else {  return string_number }  
}

//  let collection = {
//       "oneToNine" : 0 ,
//       "10-19" : 0,
//       "20-29" : 0,
//       "30-39" : 0,
//       "40-49" : 0,
//       "50-59" : 0,
//       "60-69" : 0
//    }
const collect_weight = (number , collection) => {
      switch(true) {
            case (number > 0 && number<=  9) : collection.one ++ 
            break;
            case (number > 9 && number<=  19) : collection.two ++ 
            break;
            case (number > 19 && number<=  29) : collection.three ++ 
            break;
            case (number > 29 && number<=  39) : collection.four ++ 
            break;
            case (number > 39 && number<=  49) : collection.five ++ 
            break;
            case (number > 49 && number<= 59) : collection.six ++ 
            break;
            case (number > 59 && number<=  69) : collection.seven ++ 
            break;
      }
}

const collect_weight_mega = (number , collection) => {
      switch(true) {
            case (number > 0 && number<=  9) : collection.one ++ 
            break;
            case (number > 9 && number<=  19) : collection.two ++ 
            break;
            case (number > 19 && number<=  29) : collection.three ++ 
            break;
            case (number > 29 && number<=  39) : collection.four ++ 
            break;
            case (number > 39 && number<=  49) : collection.five ++ 
            break;
            case (number > 49 && number<= 59) : collection.six ++ 
            break;
            case (number > 59 && number<=  70) : collection.seven ++ 
            break;
      }
}

const fetch_five = (string) => string.substring(0, string.lastIndexOf(' '))

const covert_five = (string) => string.split(' ')

const fetch_powerball = (string) =>  string.substring(string.lastIndexOf(" ") + 1 )

const fetch_date_YYMMDD = (string) => string.substring(0, string.indexOf('T'))

const map_draw_date = (input, date_array) =>  date_array.find( date_current => date_current == input ? date_current == input : moment(input).isAfter(date_current)   )        

const map_draw_date_index = (input, data_array) => data_array.findIndex( data => fetch_date_YYMMDD(data.draw_date) == input ? data.draw_date : moment(input).isAfter(fetch_date_YYMMDD(data.draw_date) )  ) 

const map_draw_date_index_2 = (input, data_array) => data_array.findIndex( data => fetch_date_YYMMDD(data.draw_date) == input ? data.draw_date : moment(input).isBefore(fetch_date_YYMMDD(data.draw_date) )  ) 

const collect_continuous = (string) => {
      let current_con 
      let array = string.split(" ") // [ 1, 3 ,4 ,11 ,2]
      let pervious_con = array[0];
      let party_level = 1
      let result = []
      for(let i = 0 ; i < array.length; i++) {
              if( parseInt(array[i]) + 1 == parseInt(array[i + 1]) ) {
                  current_con = pervious_con + `,${array[i + 1]}`
                  pervious_con = current_con 
                  party_level ++
                  result.push({code:JSON.stringify(party_level),number:pervious_con})
             } else {
                //console.log(party_level , pervious_con)
                  party_level = 1
                  pervious_con = array[i + 1]
             }
      }
      return result
}

const number_is_similar = (string_a , string_b) => {
      let poweball_a= fetch_powerball(string_a)
      let poweball_b= fetch_powerball(string_b)

      let count = 0
      let array_a_five  = fetch_five(string_a).split(" ")
      let array_b_five  = fetch_five(string_b).split(" ")
      if (poweball_a == poweball_b) count = count + 2

      array_b_five.forEach( number => {
              if( array_a_five.includes(number) ) count ++
      })
      return count >= 4 ? true:false
}

// const number_is_similar_mega = (string_a , string_b) => {
//       let poweball_a= fetch_powerball(string_a)
//       let poweball_b= fetch_powerball(string_b)

//       let count = 0
//       let array_a_five  = fetch_five(string_a).split(" ")
//       let array_b_five  = fetch_five(string_b).split(" ")
//       if (poweball_a == poweball_b) count = count + 2

//       array_b_five.forEach( number => {
//               if( array_a_five.includes(number) ) count ++
//       })
//       return count >= 4 ? true:false
// }

const genertate_random_number = () => {     
       let powerball = zerofy( Math.floor(Math.random() * (27)) + 1)
       let array = []
       for ( let i = 0 ; array.length < 5; ){
             let number_five =  zerofy( Math.floor(Math.random() * (69)) + 1 ); 
              if ( !array.includes(number_five) )  { 
                    array.push(number_five) 
            } 
       }
       array.sort()
       array.push(powerball)
       return  array.toString().replaceAll(',' , ' ')
}

const momentAfter = (begin, number) => moment(begin).add(number, 'months').format("YYYY-MM-DD")

module.exports = { 
                   zerofy,
                   collect_fquency_by_five, 
                   fetch_five, 
                   covert_five,
                   fetch_powerball, 
                   collect_fquency_by_powerball, 
                   collect_fquency_by_megaball, 
                   fetch_date_YYMMDD, 
                   map_draw_date, 
                   map_draw_date_index, 
                   map_draw_date_index_2,
                   collect_continuous,
                   number_is_similar,
                   genertate_random_number,  
                   collect_weight, 
                   momentAfter,
                   collect_weight_mega
                        
                }