import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { DatabaseUsuario } from '../services/databaseusuario';

// ===== MOCKS ===== //

class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

class MockDatabaseUsuario {
  verificarUsuario(correo: string, password: string): Promise<boolean> {
    if (correo === 'test@mail.com' && password === '1234') {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage], // standalone
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: DatabaseUsuario, useClass: MockDatabaseUsuario }
      ]
    }).compileComponents();

    sessionStorage.setItem('isLoggedIn', 'false');

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
