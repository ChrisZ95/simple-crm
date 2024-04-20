import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userIdfromUrl: any = '';
  user: User = new User();

  constructor(private route:ActivatedRoute, public dialog: MatDialog, private readonly firestore: Firestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userIdfromUrl = paramMap.get('id');
      console.log('GOT ID', this.userIdfromUrl);
      this.getUser();
    })
  }

  getUser() {
    onSnapshot(doc(collection(this.firestore, 'users'), this.userIdfromUrl), (user: any) => {
      this.user = new User(user.data());
      console.log('Retrieved User', this.user)
    })
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userIdfromUrl;
  }

  editUserDetail(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userIdfromUrl;
  }

  toDate(timestamp: number): Date {
    return new Date(timestamp);
  }
}