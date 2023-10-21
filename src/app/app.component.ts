import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currency:string = '$';

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', [Validators.required, this.phoneValidator()]],
  });

  phoneValidator(): ValidatorFn {
    const phoneRegexp:RegExp =
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = phoneRegexp.test(control.value);
      return valid ? null : { invalidPhone: { value: control.value } };
    };
  }

  productsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.appService.getData().subscribe((data) => (this.productsData = data));
  }

  scrollTo(target: HTMLElement, burger?: any):void {
    target.scrollIntoView({ behavior: 'smooth' });

    if (burger) {
      this.form.patchValue({
        order: burger.title + ' (' + burger.price + ' ' + this.currency + ')',
      });
    }
  }

  confirmOrder():void {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.form.reset();
        },
        error: (response) => {
          alert(response.error.message);
        },
      });
    }
  }

  changeCurrency():void {
    let newCurrency:string = '$';
    let coefficient:number = 1;

    if (this.currency === '$') {
      newCurrency = '€';
      coefficient = 0.91;
    } else if (this.currency === '€') {
      newCurrency = '₴';
      coefficient = 36.86;
    }

    this.currency = newCurrency;

    this.productsData.forEach((item: any):void => {
      item.price = (item.basePrice * coefficient)
        .toFixed(1)
        .replace(/\.0$/, '');
    });
  }
}
