import { Component, OnInit } from '@angular/core';
import { filter, finalize, mergeMap, startWith } from 'rxjs/operators';
import { Member } from '@app/api/models/member.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { MemberService } from '@app/api/services/member.service';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {
  members: Member[];
  form: FormGroup;

  editForm: FormGroup;
  selectedMember: Member;

  filterForm: FormGroup;

  sub = new SubscriptionManager();
  loading: number | boolean;
  loadingUpdate: number | boolean;

  constructor(private memberService: MemberService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.createForm();
    this.editForm = this.createForm();

    this.filterForm = this.fb.group({
      with_trashed: []
    });

    this.sub.add = this.filterForm.valueChanges.pipe(
      startWith(true),
      mergeMap(() => this.memberService.get(null, null, this.filterForm.getRawValue()))
    ).subscribe(
      members => this.members = members.data
    );
  }

  private createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      picture: [null, Validators.required],
    });
  }

  ngOnInit() {

  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    this.form.disable();
    this.memberService.post(data).pipe(
      uploadProgressOperator(progress => this.loading = progress),
      finalize(() => this.form.enable())
    ).subscribe(
      member => {
        this.members.unshift(member);
        this.form.reset();
      },
      error => this.notify.error(error)
    );
  }

  deleteMember(member: Member) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {message: member.name} as ConfirmDialogData
    }).afterClosed().pipe(
      filter(a => !!a),
      mergeMap(() => this.memberService.delete(member.id))
    ).subscribe(() => {
        if (this.filterForm.get('with_trashed').value) {
          member.deleted_at = '-';
        } else {
          this.members.splice(this.members.indexOf(member), 1);
        }
      },
      error => this.notify.error(error));
  }

  restoreMember(member: Member) {
    this.memberService.restore(member.id).subscribe(
      restoredMember => {
        member.replaceProperties(restoredMember);
        this.notify.showTranslated(extract('form.updatedSuccess'));
      },
      error => this.notify.error(error));
  }

  selectToEditMember(member: Member) {
    if (this.selectedMember !== member) {
      this.selectedMember = member;
      this.loadingUpdate = false;
      this.editForm.reset({
        name: member.name,
      });
    }
  }

  editMember($event) {
    $event.stopPropagation();
    const data = this.editForm.getRawValue();
    this.memberService.edit(this.selectedMember.id, data).pipe(
      uploadProgressOperator(progress => this.loadingUpdate = progress),
    ).subscribe(
      member => {
        console.log('aaaa');
        this.selectedMember.replaceProperties(member);
        this.selectToEditMember(this.selectedMember);
        this.notify.showTranslated(extract('form.success'));
      },
      error => this.notify.error(error)
    );
  }
}
