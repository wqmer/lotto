const Data = require('./model').Data
const Continuous = require('./model').Continuous
const uility = require('./uility')
const api = require('./api')
const moment = require('moment')

// const continuous = new Continuous()

// console.log(uility.momentAfter('2018-01-01', 20))

// api.collect_weight_by('2018-06-01').then( result => console.log(result))

// api.collect_weight_by_mega('2018-10-01').then( result => console.log(result))

// api.list_cumulative_fquency_five_by('2021-06-01',10).then( result => console.log(result))

// api.list_cumulative_fquency_powerBall_by('2021-08-01',10).then( result => console.log(result))

// api.list_cumulative_fquency_five_mega_by('2021-01-01',10).then( result => console.log(result))

// api.list_cumulative_fquency_megaBall_by('2021-01-01',10).then( result => console.log(result))

// api.get_data().then( (result) => { console.log(result); })

// api.get_data_from_date('2021-06-01').then((result) => { console.log(result); })

api.get_data_from_date_mega('2021-06-01').then((result) => { console.log(result); })

// api.get_high_fquency_five_mega('2018-10-01').then( (result) => { console.log(result); })

// api.get_high_fquency_five('2018-08-01','2018-12-01',15).then( (result) => { console.log(result); })

// api.get_high_frequency_megaball('2018-10-01','2018-12-01',10).then( result => console.log(result))

// api.get_high_frequency_powerball('2018-01-01','2018-12-01',15).then( result => console.log(result) )

// api.get_data_from_date('2018-07-01').then( (result) => { console.log(result); })

// api.get_low_frequency_powerball('2018-01-01' ).then( result => console.log(result) )

// api.get_consec_nubmer_frequency_mega().then( result => console.log(result))

// api.get_consec_nubmer_frequency().then( (result) => console.log(result))

// let string_a = '10 29 33 59 60 11'

// api.find_some_similar(string_a).then(result => console.log(result))




