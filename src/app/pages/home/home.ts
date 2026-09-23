import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConsultationForm } from '../../consultation/consultation-form';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ConsultationForm],
  templateUrl: './home.html',
})
export class Home {}
