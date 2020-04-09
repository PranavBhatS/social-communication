import { Component, OnInit, ViewChild } from '@angular/core';
import { FolderDbService } from '../folder-db.service';
import { Router } from '@angular/router';
import { NavController, AlertController, IonContent } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
	selector: 'app-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
	messagesList = []
	ref: firebase.database.Reference;
	name;
	newmessage:string;
	loggedInUser
	constructor(public navCtrl: NavController, public alert: AlertController) {
		this.ref = firebase.database().ref('messages');
		
	}

	ngOnInit() { }

	ionViewWillEnter() {
		this.loggedInUser = JSON.parse(localStorage.getItem("user"));
		this.ionViewDidLoad()
	}
	ionViewDidLoad() {
		//reading data from firebase
		this.ref.on('value', data => {
			let tmp = [];
			data.forEach(data => {
				tmp.push({
					key: data.key,
					name: data.val().name,
					message: data.val().message,
					userId:data.val().userId,
					time:data.val().time,
					photoURL:data.val().photoURL
				})
			});
			this.messagesList = tmp;
			setTimeout(() => {
				this.updateScroll();
			}, 500);
		});
	}

	send() {
		this.newmessage = this.newmessage.trim();
		if(!this.newmessage) {
			this.newmessage =""
			return
		}
		this.ref.push({
			userId :this.loggedInUser.uid,
			name: this.loggedInUser.displayName,
			message: this.newmessage,
			time:Date(),
			photoURL:this.loggedInUser.photoURL
		});
		this.newmessage =""
	}
	async delete(message) {
		// if(this.loggedInUser.email !="pranavb@gmail.com") {
		// 	return
		// }
		let data = await firebase.database().ref(`messages/${message.key}`).remove();
		debugger
	}
	@ViewChild("scrollElement",{static:false}) content: IonContent;
	updateScroll() {
        if (this.content.scrollToBottom) {
          this.content.scrollToBottom(400);
        }
    }
}
