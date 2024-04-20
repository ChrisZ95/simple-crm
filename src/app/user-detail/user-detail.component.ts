import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ MatCardModule, CommonModule, MatIconModule, MatButtonModule ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: any = {};
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  aCollection = collection(this.firestore, 'users');

  constructor(private route:ActivatedRoute) {
    const aCollection = collection(this.firestore, 'users')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.userId = id;
        console.log('GOT ID', this.userId);
        this.getUser();
      }
    });
  }

  async getUser() {
    try {
      const userRef = doc(this.firestore, 'users', this.userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        this.user = userSnap.data();
        console.log('Retrieved user', this.user)
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }

  openAddressDialog(){
    
  }
}