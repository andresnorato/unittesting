import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
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


  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {

    it('sholud return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      //Act
      productService.getAllSimple()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data).toEqual(mockData);
          doneFn();
        });

      //HTPP CONFIG
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);

    });
  });

  describe('test for getAll', () => {

    it('sholud return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          // expect(data).toEqual(mockData);
          doneFn();
        });

      //HTPP CONFIG
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
    });


    it('sholud send query with limit 10 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset)
        .subscribe((data) => {
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
    });


    it('should return product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
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
        .subscribe((data) => {
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });

      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
    });
  });

  describe('test for post', () => {

    it('should return a new product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();

      const dto: CreateProductDTO = {
        title: 'Holaa',
        price: 400,
        description: 'bla bla',
        categoryId: 2,
        images: ['aksa', 'kaskals']
      };
      //Act
      productService.create({ ...dto })
        .subscribe(data => {
          //Assert
          expect(data).toEqual(mockData)
          doneFn();
        });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for put', () => {
    it('should update a product', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new product',
      };
      const productId = '1';
      //Act
      productService.update(productId, {...dto})
      .subscribe(data =>{
        expect(data).toEqual(mockData);
        doneFn();
    });

    //http config
    //URL de donde se hace la peticion
    const url = `${environment.API_URL}/api/v1/products/${productId}`;
    // Especificacion a donde debe realizar la peticion
    const req = httpController.expectOne(url);
    req.flush(mockData);
    expect(req.request.body).toEqual(dto);
    expect(req.request.method).toEqual('PUT');
    });
  });

  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
    //Arrage
    const mockData = true;
    const productId = '1';

    productService.delete(productId)
    .subscribe(data =>{
      expect(data).toEqual(mockData);
      doneFn();
    });
    //http config
    //URL de donde se hace la peticion
    // Especificacion a donde debe realizar la peticion
    const url = `${environment.API_URL}/api/v1/products/${productId}`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockData);
    });
  });
});
