import { formateDate } from './date';

describe('formateDate', () => {
    it('check format', () => {
        expect(formateDate(1577014368252, 'yyyy')).toBe('2019');
    });
});