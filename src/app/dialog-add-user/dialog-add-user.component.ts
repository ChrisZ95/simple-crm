import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../../models/user.class';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  aCollection = collection(this.firestore, 'users')

  constructor() {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    addDoc(collection(this.firestore, 'users'), this.user.toJSON())
      .then((result: any) => {
        console.log('Adding user finished', result);
      })
      .catch(error => {
        console.error('Error adding user: ', error);
      });
  }
}