import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/pruduct.mock';

fdescribe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {

    it('sholud return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      //Act
      productService.getAllSimple()
      .subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      //HTPP CONFIG
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      httpController.verify();

    });
  });

  describe('test for getAll', () => {

    it('sholud return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll()
      .subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      //HTPP CONFIG
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      httpController.verify();
    });


    it('sholud send query with limit 10 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset)
      .subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      //HTPP CONFIG
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });


    it('should return product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ... generateOneProduct(),
          price: 100, ///  19
        },
        {
          ...generateOneProduct(),
          price: 200, // 38
        },
        {
          ...generateOneProduct(),
          price: 0 // * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100 // * .19 = 0
        },
      ];

        productService.getAll()
        .subscribe((data) =>{
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });

        const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
        req.flush(mockData);
        httpController.verify();
    });
  });
});
