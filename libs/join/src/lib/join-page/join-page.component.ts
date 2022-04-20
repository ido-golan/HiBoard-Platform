import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {TippyModule} from "@ngneat/helipopper";
import {User} from "../../../../user/src/users.types";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {CompanyService} from "@hiboard/company/state/company.service";
import {Company} from "@hiboard/company/company.types";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'hbd-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinPageComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    company: new FormControl('', Validators.required),
  })

  loading = false;

  hidePassword = true;

  constructor(private userService: UserService,
              private companyService: CompanyService,
              private cdr: ChangeDetectorRef,
              private toast: HotToastService) {
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const {firstName, lastName, email, password, company, departments} = this.form.value;

    const adminUser = {
      firstName,
      lastName,
      email,
      password,
      role: 'admin',
    } as User.Entity & { password: string };

    const newCompany = {
      name: company,
      admin: email
    } as Company.Entity;

    this.userService.createUser(adminUser).subscribe({
      next: () => {
        this.companyService.createCompany(newCompany).subscribe({
          next: () => {
            this.toast.success('User and Company Created Successfully');
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.toast.error('Unable to create company, please try again later');
            this.loading = false;
            this.cdr.detectChanges();
          }
        })
      },
      error: () => {
        this.toast.error('Unable to create user, please try again later');
        this.loading = false;
        this.cdr.detectChanges();
      }
    })
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [JoinPageComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ErrorTailorModule, TippyModule],
  exports: [JoinPageComponent]
})
export class JoinPageComponentModule {
}