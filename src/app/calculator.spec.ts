import { Calculator } from './calculator';


describe('Test for Calculator', () =>{
    describe('Tests for multiply', () => {
        it('#multiply should return a nine', () =>{
            //AAA
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(3,3);
            //Assert
            expect(rta).toEqual(9);
        });
    
    
        it('#multiply should return a four', () =>{
            //AAA
            //Arrange
            const calculator = new Calculator();
            //Act
            const rta = calculator.multiply(1,4);
            //Assert
            expect(rta).toEqual(4);
        });
    });


    describe('Tests for divide', () =>{
        it('#divide should return a some numbers', () =>{
            //AAA
            //Arrange
            const calculator = new Calculator();
            //Act //Assert
            expect(calculator.divide(6,3)).toEqual(2);
            expect(calculator.divide(5, 2)).toEqual(2.5);
        });
    
    
        it('#divide for a zero', () =>{
            //AAA
            //Arrange
            const calculator = new Calculator();
            //Act //Assert
            expect(calculator.divide(6,0)).toBeNull();
            expect(calculator.divide(5, 0)).toBeNull();
        });


        it('tests matchers', () =>{
            const name = 'Andres';
            let name2;
            expect(name).toBeDefined();
            expect(name2).toBeUndefined();
            
            expect( 1+ 3 === 4).toBeTruthy();// 4
            expect(1 + 1 === 3).toBeFalsy();//2
            
            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(10);
    
    
            expect('121312').toMatch(/121312/);
            expect(['apples', 'oranges', 'pears']).toContain('apples');
        });

    });
});