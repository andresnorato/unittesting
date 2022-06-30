import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });


  afterEach(()=>{
    httpController.verify();
  })


  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', ()=>{

    it('should return a token', (doneFn)=>{
      //Arrage
      const email = 'prubas.com';
      const password = '1234';
      const mockData:Auth = {
        access_token: '2342374'
      }

      //Act
      authService.login(email, password)
      .subscribe(data =>{
        expect(data).toEqual(mockData);
       doneFn()
      })

      //Assert
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');

    });



    it('should call to saveToken', (doneFn)=>{
      //Arrage
      const mockData:Auth = {
        access_token: '2342374'
      }
      const password = '1234';
      const email = 'prubas.com';
      spyOn(tokenService, 'seveToken').and.callThrough();
      //Act
      authService.login(email, password)
      .subscribe(data =>{
        expect(data).toEqual(mockData);
        expect(tokenService.seveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.seveToken).toHaveBeenCalledOnceWith('2342374')
       doneFn()
      })

      //Assert
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');

    });


  });
});
