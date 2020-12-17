import locationsInstance, { Locations } from '../locations'
import { formateDate } from "../../helpers/date"
import api, { Api } from '../../services/apiService'

const countries = [{ code: 'UKR', name: 'Ukraine' }]
const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }]
const airlines = [{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }]

jest.mock('../../services/apiService', () => {
    const mockApi = {
        countries: jest.fn(() => Promise.resolve([{ code: 'UKR', name: 'Ukraine' }])),
        cities: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }])),
        airlines: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }])),
    }

    return {
        Api: jest.fn(() => mockApi)
    }
})

const apiService = new Api()


describe('Locations stor tests', () => {
    beforeEach(() => {
        locationsInstance.countries = locationsInstance.serializeCountries(countries)
        locationsInstance.cities = locationsInstance.serializeCities(cities)
    })

    it('check that locationIsntance is of Loactiaos class', () => {
        expect(locationsInstance).toBeInstanceOf(Locations)
    })

    it('Succes Loactions instamce creat', () => {
        const instance = new Locations(api, { formateDate })
        expect(instance.countries).toBe(null)
        expect(instance.shortCities).toEqual({})
        expect(instance.formateDate).toEqual(formateDate)


    })
    it('check correct countries serialize', () => {
        const res = locationsInstance.serializeCountries(countries)
        const expectedData = {
            UKR: { code: 'UKR', name: 'Ukraine' }
        }

        expect(res).toEqual(expectedData)
    })
    it('check correct countries serialize witch incorrect data', () => {
        const res = locationsInstance.serializeCountries(null)
        const expectedData = {}

        expect(res).toEqual(expectedData)
    })

    it('check correct cities serialize', () => {
        const res = locationsInstance.serializeCities(cities)
        const expectedData = {
            KH: {
                country_code: 'UKR',
                name: 'Kharkiv',
                code: 'KH',
                country_name: 'Ukraine',
                full_name: 'Kharkiv,Ukraine'
            }
        }

        expect(res).toEqual(expectedData)
    })

    it('check correct get city by code', () => {
        const res = locationsInstance.getCityNameByCode('KH')
        expect(res).toEqual('Kharkiv')
    })

    it('check correct init method call', () => {
        const instance = new Locations(apiService, { formateDate })
        expect(instance.init()).resolves.toEqual([countries, cities, airlines])
    })
})