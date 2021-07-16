import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css', '../app.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          // prettier-ignore
          Validators.pattern("[0-9]*"),
        ]),
      ],
    });
  }
  sendMessage() {
    if (this.contactForm.valid)
      this.http
        .post(environment.apiURL + 'contact-message', {
          name: this.contactForm.controls['name'].value,
          message: this.contactForm.controls['message'].value,
          phone: this.contactForm.controls['phone'].value,
        })
        .subscribe((res) => {
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم إرسال رسالتك  بنجاح ',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    else this.contactForm.markAllAsTouched();
  }
}
