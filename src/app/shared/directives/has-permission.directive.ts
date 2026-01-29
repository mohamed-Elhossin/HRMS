import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private authService:AuthService
  ) { }

  @Input('hasPermission') set requiredPermission(permission: string | string[]) {
    const userPermissions = this.authService.getUserPermissions();

    const hasAccess = Array.isArray(permission)
      ? permission.some((perm) => userPermissions.includes(perm))
      : userPermissions.includes(permission);

    if (hasAccess) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();
    }
  }

}

//   صلاحية واحدة
// <button *hasPermission="'EDIT_PRODUCT'">تعديل</button>

// أكثر من صلاحية
// <div *hasPermission="['EDIT_PRODUCT', 'DELETE_PRODUCT']">إجراء إداري</div>
