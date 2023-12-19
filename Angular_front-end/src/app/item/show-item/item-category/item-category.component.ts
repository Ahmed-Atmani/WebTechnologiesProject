import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(public service: SharedService) {}

  @Input() category: any;

  ItemList: any = [];
  ImagesList: any = {};

  ngOnInit(): void {
    this.fillItemList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fillItemList() {
    this.service.getItemList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.ItemList = data.filter(item => item.ItemCategory === this.category.ItemCategoryId);
        this.fillImagesList();
      });
  }

  fillImagesList() {
    const imagePromises = this.ItemList.map((item: any) => {
      return this.service.getImagesForItem(item.ItemId).toPromise();
    });

    Promise.all(imagePromises)
      .then(imagesArray => {
        imagesArray.forEach((images, index) => {
          this.ImagesList[this.ItemList[index].ItemId] = images.length > 0 ? images[0] : null;
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }

  filterImage(itemId: number): any {
    return this.ImagesList[itemId] || null;
  }
}
