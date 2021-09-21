const request = require('request');
const Data = require('./model').Data
const MegaData = require('./model').MegaData
const Continuous = require('./model').Continuous
const uility = require('./uility')
const moment = require('moment')

const get_data = () => {
    return new Promise((resolve, reject) => {
        request({
            //powerball
            url: 'https://data.ny.gov/resource/8vkr-v8vh.json',

            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect server');
            } else if (response.statusCode === 400) {
                reject('Unable to fetch data.');
            } else if (response.statusCode === 200) {
                resolve(body);
            }
        });
    })
};


const get_data_mega = () => {
    return new Promise((resolve, reject) => {
        request({
            // megaball
            url: 'https://data.ny.gov/resource/5xaw-6ayf.json?$limit=5000',
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect server');
            } else if (response.statusCode === 400) {
                reject('Unable to fetch data.');
            } else if (response.statusCode === 200) {
                resolve(body);
            }
        });
    })
};

const get_data_from_date = (after_date = "2010-02-03", before_date = moment().format('YYYY-MM-DD')) => {
    after_date = moment(after_date).isBefore("2010-02-03") ? "2010-02-03" : after_date
    let before, after, data
    return new Promise((resolve, reject) => {
        if (moment(after_date).isAfter(before_date)) {
            reject('Error , End time before start time !')
        }
        else {
            get_data().then(data_array => {
                data = data_array
                before = uility.map_draw_date_index(before_date, data)
                after = uility.map_draw_date_index(after_date, data)
            })
                .then(() => resolve(data.slice(before, after)))
                .catch(error => reject(error))
        }
    })
}

const get_data_from_date_mega = (after_date = "2002-05-17", before_date = moment().format('YYYY-MM-DD')) => {
    after_date = moment(after_date).isBefore("2002-05-17") ? "2002-05-17" : after_date
    let before, after, data
    return new Promise((resolve, reject) => {
        if (moment(after_date).isAfter(before_date)) {
            reject('Error , End time before start time !')
        }
        else {
            get_data_mega().then(data_array => {
                data = data_array
                before = uility.map_draw_date_index_2(before_date, data)
                after = uility.map_draw_date_index_2(after_date, data)
            })
                .then(() => resolve(data.slice(after, before)))
                .catch(error => reject(error))
        }
    })
}


const get_high_fquency_five = (after_date, before_date, number_display = 5) => {
    return new Promise((resolve, reject) => {
        let data = new Data()
        let mostFquency = []
        let tier = number_display
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let five = uility.fetch_five(element)
                    uility.collect_fquency_by_five(five, data.array_five)
                })
            })
            .then(() => {
                for (let i = 0; i < tier; i++) {
                    let index_max_crrent = data.array_five.indexOf(Math.max(...data.array_five))
                    mostFquency.push(index_max_crrent)
                    data.array_five.splice(index_max_crrent, 1, 0)
                }
            })
            .then(() => resolve(mostFquency))
            .catch(error => reject(error))
    })
}

const get_high_fquency_five_mega = (after_date, before_date, number_display = 10) => {
    return new Promise((resolve, reject) => {
        let data = new MegaData()
        let mostFquency = []
        let tier = number_display
        get_data_from_date_mega(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    uility.collect_fquency_by_five(element, data.array_five)
                })
            })
            .then(() => {
                for (let i = 0; i < tier; i++) {
                    let index_max_crrent = data.array_five.indexOf(Math.max(...data.array_five))
                    mostFquency.push(index_max_crrent)
                    data.array_five.splice(index_max_crrent, 1, 0)
                }
            })
            .then(() => resolve(mostFquency))
            .catch(error => reject(error))
    })
}


const get_low_fquency_five = (after_date, before_date, number_display = 5) => {
    return new Promise((resolve, reject) => {
        let data = new Data()
        let lowestFquency = []
        let tier = number_display
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let five = uility.fetch_five(element)
                    uility.collect_fquency_by_five(five, data.array_five)
                })
            })
            .then(() => {
                for (let i = 0; i < tier + 1; i++) {
                    let index_max_crrent = data.array_five.indexOf(Math.min(...data.array_five))
                    lowestFquency.push(index_max_crrent)
                    data.array_five.splice(index_max_crrent, 1, 9999)
                }
            })
            .then(() => {
                lowestFquency.splice(0, 1)
                resolve(lowestFquency)
            })
            .catch(error => reject(error))
    })
}


const get_high_frequency_powerball = (after_date, before_date, number_display = 5) => {
    return new Promise((resolve, reject) => {
        let data = new Data()
        let highestFquency = []
        let tier = number_display
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let number = uility.fetch_powerball(element)
                    if (number < 27) uility.collect_fquency_by_powerball(number, data.powerball)
                })
            })
            .then(() => {
                for (let i = 0; i < tier; i++) {
                    let index_max_crrent = data.powerball.indexOf(Math.max(...data.powerball))
                    highestFquency.push(index_max_crrent)
                    data.powerball.splice(index_max_crrent, 1, 0)
                }
            })
            .then(() => {
                resolve(highestFquency)
            })
            .catch(error => reject(error))
    })
}

const get_high_frequency_megaball = (after_date, before_date, number_display = 5) => {
    return new Promise((resolve, reject) => {
        let data = new MegaData()
        let highestFquency = []
        let tier = number_display
        get_data_from_date_mega(after_date, before_date).then(list => list.map(record => record.mega_ball))
            .then(number_array => {
                number_array.forEach(element => {
                    let number = element
                    //   console.log(element)
                    if (number < 27) uility.collect_fquency_by_megaball(number, data.megaball)
                })
            })
            .then(() => {
                for (let i = 0; i < tier; i++) {
                    let index_max_crrent = data.megaball.indexOf(Math.max(...data.megaball))
                    highestFquency.push(index_max_crrent)
                    data.megaball.splice(index_max_crrent, 1, 0)
                }
            })
            .then(() => {
                resolve(highestFquency)
            })
            .catch(error => reject(error))
    })
}


const get_low_frequency_powerball = (after_date, before_date, number_display = 5) => {
    return new Promise((resolve, reject) => {
        let data = new Data()
        let lowestFquency = []
        let tier = number_display
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let number = uility.fetch_powerball(element)
                    if (number < 27) uility.collect_fquency_by_powerball(number, data.powerball)
                })
            })
            .then(() => {
                for (let i = 0; i < tier + 1; i++) {
                    let index_min_crrent = data.powerball.indexOf(Math.min(...data.powerball))
                    lowestFquency.push(index_min_crrent)
                    data.powerball.splice(index_min_crrent, 1, 999)
                }
            })
            .then(() => {
                lowestFquency.splice(0, 1)
                resolve(lowestFquency)
            })
            .catch(error => reject(error))
    })
}


const get_consec_nubmer_frequency = (after_date, before_date) => {
    const continuous = new Continuous()
    return new Promise((resolve, reject) => {
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let five = uility.fetch_five(element)
                    let result = uility.collect_continuous(five)
                    result.forEach(obj => continuous.collect(obj.code, obj.number))
                })
            })
            .then(() => resolve(continuous))
            .catch(error => reject(error))
    })
}

const get_consec_nubmer_frequency_mega = (after_date, before_date) => {
    const continuous = new Continuous()
    return new Promise((resolve, reject) => {
        get_data_from_date_mega(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                number_array.forEach(element => {
                    let five = element
                    let result = uility.collect_continuous(five)
                    result.forEach(obj => continuous.collect(obj.code, obj.number))
                })
            })
            .then(() => resolve(continuous))
            .catch(error => reject(error))
    })
}



const find_some_similar = (string, after_date, before_date) => {
    let result_obj = {
        messange: undefined,
        input: string,
        numberlist: []
    }
    return new Promise((resolve, reject) => {
        get_data_from_date(after_date, before_date)
            .then(data_array => data_array.filter(element => uility.number_is_similar(element.winning_numbers, string)))
            .then(result => {
                if (result.length > 0) {
                    result_obj.messange = 'Get some similar draw numbers!'
                    result_obj.numberlist = result.filter(item => delete (item.multiplier))
                    resolve(JSON.stringify(result_obj, null, 4))
                }
                else {
                    resolve('No number similar to this number!')
                }
            })
            .catch(error => reject(error))
    })
}

// const find_some_similar_mega = ( string, after_date, before_date  ) => {
//     let result_obj = {
//                       messange : undefined,
//                       input : string ,
//                       numberlist : []
//         }
//     return new Promise ( ( resolve, reject) => { 
//                            get_data_from_date_mega(after_date, before_date) 
//                            .then( data_array => data_array.filter( element => uility.number_is_similar(element.winning_numbers, string)  )   )
//                            .then( result => {
//                                   if (result.length > 0) {
//                                       result_obj.messange = 'Get some similar draw numbers!'
//                                       result_obj.numberlist = result.filter(item => delete(item.multiplier) )
//                                       resolve( JSON.stringify(result_obj,null,4) )
//                                   }
//                                   else { 
//                                       resolve('No number similar to this number!')
//                                   }
//                            })
//                            .catch(error => reject(error))
//                       })
// }

const collect_weight_by = (after_date, before_date) => {
    let total_draw = 1;
    let collection = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0
    }

    return new Promise((resolve, reject) => {
        let data = new Data()
        let mostFquency = []
        get_data_from_date(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                total_draw = number_array.length;
                number_array.forEach(element => {
                    let five = uility.fetch_five(element).split(' ');
                    five.forEach(number => {
                        uility.collect_weight(number, collection)
                    })
                })
            }).then(() => {
                let display_collection = {
                    "1-9": collection.one / total_draw,
                    "10-19": collection.two / total_draw,
                    "20-29": collection.three / total_draw,
                    "30-39": collection.four / total_draw,
                    "40-49": collection.five / total_draw,
                    "50-59": collection.six / total_draw,
                    "60-69": collection.seven / total_draw,
                };
                console.log('totally ' + total_draw + ' draws')
                resolve(display_collection)
            }).catch(error => reject(error))
    })
}

const collect_weight_by_mega = (after_date, before_date) => {
    let total_draw = 1;
    let collection = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0
    }

    return new Promise((resolve, reject) => {
        let data = new Data()
        let mostFquency = []
        get_data_from_date_mega(after_date, before_date).then(list => list.map(record => record.winning_numbers))
            .then(number_array => {
                total_draw = number_array.length;
                number_array.forEach(element => {
                    let five = uility.covert_five(element);

                    //  console.log(typeof (five) )    
                    five.forEach(number => {
                        uility.collect_weight_mega(number, collection)
                    })
                })
            }).then(() => {
                let display_collection = {
                    "1-9": collection.one / total_draw,
                    "10-19": collection.two / total_draw,
                    "20-29": collection.three / total_draw,
                    "30-39": collection.four / total_draw,
                    "40-49": collection.five / total_draw,
                    "50-59": collection.six / total_draw,
                    "60-70": collection.seven / total_draw,
                };
                console.log('totally ' + total_draw + ' draws')
                resolve(display_collection)
            }).catch(error => reject(error))
    })
}

const list_cumulative_fquency_five_by = (after, number) => {
    var array = []
    var resultList = []
    return new Promise((resolve, reject) => {
        for (let i = 1; i < number + 1; i++) {
            let before = uility.momentAfter(after, i)
            if (moment(before).isAfter(moment().format('YYYY-MM-DD'))) {
                before = moment().format('YYYY-MM-DD')
                i = number + 1; //end loop
            }
            array.push(get_high_fquency_five(after, before, 10))
            resultList.push({ after, before })
        }
        Promise.all(array).then(list => {
            for (var i = 0; i < list.length; i++) {
                resultList[i].PowerBallFiveResult = list[i]
            }

        }).then(() => resolve(resultList))
            .catch(error => reject(error))
    })
}

const list_cumulative_fquency_five_mega_by = (after, number) => {
    var array = []
    var resultList = []
    return new Promise((resolve, reject) => {
        for (let i = 1; i < number + 1; i++) {
            let before = uility.momentAfter(after, i)
            if (moment(before).isAfter(moment().format('YYYY-MM-DD'))) {
                before = moment().format('YYYY-MM-DD')
                i = number + 1; //end loop
            }
            array.push(get_high_fquency_five_mega(after, before, 10))
            resultList.push({ after, before })
        }
        Promise.all(array).then(list => {
            for (var i = 0; i < list.length; i++) {
                resultList[i].MegaBallFiveResult = list[i]
            }

        }).then(() => resolve(resultList))
            .catch(error => reject(error))
    })
}

const list_cumulative_fquency_powerBall_by = (after, number) => {
    var array = []
    var resultList = []
    return new Promise((resolve, reject) => {
        for (let i = 1; i < number + 1; i++) {
            let before = uility.momentAfter(after, i)
            if (moment(before).isAfter(moment().format('YYYY-MM-DD'))) {
                before = moment().format('YYYY-MM-DD')
                i = number + 1; //end loop
            }
            array.push(get_high_frequency_powerball(after, before, 10))
            resultList.push({ after, before })
        }
        Promise.all(array).then(list => {
            for (var i = 0; i < list.length; i++) {
                resultList[i].PowerBallResult = list[i]
            }

        }).then(() => resolve(resultList))
            .catch(error => reject(error))
    })
}

const list_cumulative_fquency_megaBall_by = (after, number) => {
    var array = []
    var resultList = []
    return new Promise((resolve, reject) => {
        for (let i = 1; i < number + 1; i++) {
            let before = uility.momentAfter(after, i)
            if (moment(before).isAfter(moment().format('YYYY-MM-DD'))) {
                before = moment().format('YYYY-MM-DD')
                i = number + 1; //end loop
            }
            array.push(get_high_frequency_megaball(after, before, 10))
            resultList.push({ after, before })
        }
        Promise.all(array).then(list => {
            for (var i = 0; i < list.length; i++) {
                resultList[i].MegaBallResult = list[i]
            }

        }).then(() => resolve(resultList))
            .catch(error => reject(error))
    })
}

const pick_by_random = () => uility.genertate_random_number()

//todo
const find_number_not_appear = (after_date, before_date) => { }


const get_average = (beforetime, aftertime) => {

}



module.exports = {
    get_data,
    get_high_fquency_five,
    get_high_fquency_five_mega,
    get_low_fquency_five,
    get_data_from_date,
    get_data_from_date_mega,
    get_high_frequency_powerball,
    get_low_frequency_powerball,
    get_high_frequency_megaball,
    get_consec_nubmer_frequency,
    get_consec_nubmer_frequency_mega,
    find_some_similar,
    pick_by_random,
    collect_weight_by,
    collect_weight_by_mega,
    list_cumulative_fquency_five_by,
    list_cumulative_fquency_five_mega_by,
    list_cumulative_fquency_megaBall_by,
    list_cumulative_fquency_powerBall_by
}

