import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs/observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  firbiddenUserNames = ["Robin", "Cathy"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddeEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    // this.signupForm.setValue({
    //   userData: {
    //     username: "Test",
    //     email: "robin@test.com",
    //   },
    //   gender: "male",
    //   hobbies: [],
    // });

    this.signupForm.patchValue({
      userData: {
        username: "Test",
        email: "robin@test.com",
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.signupForm.get("hobbies")).push(control);
    (this.signupForm.get("hobbies") as FormArray).controls.push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // alert(this.firbiddenUserNames.indexOf(control.value));
    if (this.firbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddeEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
