import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomePage } from './home.page';

// ==== MOCKS NECESARIOS ==== //
class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

class MockPostService {
  getPosts() {
    return of([
      { id: 1, title: 'Post de prueba', body: 'Contenido de prueba' }
    ]);
  }

  getSaludoGif() {
    return of({
      titulo: 'Saludos!',
      url: 'https://fakegif.com/saludo.gif'
    });
  }
}

class MockDatabaseUsuario {
  obtenerUsuarios() {
    return Promise.resolve([
      { id: 1, correo: 'test@mail.com', password: '1234' }
    ]);
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage], // IMPORTANTE: es standby standalone
      providers: [
        { provide: 'Router', useClass: MockRouter },
        { provide: 'PostService', useClass: MockPostService },
        { provide: 'DatabaseUsuario', useClass: MockDatabaseUsuario },
        { provide: MockRouter, useClass: MockRouter },
        { provide: MockPostService, useClass: MockPostService },
        { provide: MockDatabaseUsuario, useClass: MockDatabaseUsuario }
      ]
    }).compileComponents();

    // Fake de sesión, necesario para HomePage
    sessionStorage.setItem('userEmail', 'test@mail.com');

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
