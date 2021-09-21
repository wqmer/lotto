class Data {
        constructor() {
                this.array_five = []
                this.powerball = []
                for (let i = 1; i <= 70; i++) {
                        this.array_five.push(0)
                }

                for (let i = 1; i <= 27; i++) {
                        this.powerball.push(0)
                }
        };
}

class MegaData {
        constructor() {
                this.array_five = []
                this.megaball = []
                for (let i = 1; i <= 76; i++) {
                        this.array_five.push(0)
                }

                for (let i = 1; i <= 26; i++) {
                        this.megaball.push(0)
                }
        };
}

class Continuous {
        constructor() {
                this.two_party = []
                this.three_party = []
                this.four_party = []
                this.five_party = []
        }

        collect(code, string) {
                switch (code) {
                        case '2':
                                var obj = this.two_party.find(obj => obj.nubmer == string); obj == undefined ? this.two_party.push({ nubmer: string, fquency: 1 }) : obj.fquency++
                                break;
                        case '3':
                                var obj = this.three_party.find(obj => obj.nubmer == string); obj == undefined ? this.three_party.push({ nubmer: string, fquency: 1 }) : obj.fquency++
                                break;
                        case '4':
                                var obj = this.four_party.find(obj => obj.nubmer == string); obj == undefined ? this.four_party.push({ nubmer: string, fquency: 1 }) : obj.fquency++
                                break;
                        case '5':
                                var obj = this.five_party.find(obj => obj.nubmer == string); obj == undefined ? this.five_party.push({ nubmer: string, fquency: 1 }) : obj.fquency++
                                break;
                        case '6':
                                console.log('test')
                                break;
                }
        }
}
module.exports = { Data, MegaData, Continuous }