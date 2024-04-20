import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  aCollection = collection(this.firestore, 'users');
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.items$ = collectionData(this.aCollection, { idField: 'customID' });
    this.items$.subscribe((changes: any) => {
      this.allUsers = changes;
      console.log('Received changes from DB', changes);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}