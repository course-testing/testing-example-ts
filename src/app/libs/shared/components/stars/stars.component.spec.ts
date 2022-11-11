import { TestBed } from '@angular/core/testing';
import { StarsComponentModule } from './stars.component-module';
import { StarsComponent } from './stars.component';
import { StarsPageObject } from './stars.page-object';

describe('StarsComponent', () => {
  const given = async (data: {
    rate: number
  }) => {
    await TestBed.configureTestingModule({
      imports: [StarsComponentModule],
    }).compileComponents();
    const fixture = TestBed.createComponent(StarsComponent);
    const componentInstance = fixture.componentInstance;

    componentInstance.rate = data.rate;
    fixture.detectChanges();

    return {
      starsPageObject: new StarsPageObject(fixture),
    }
  };

  [
    {
      givenData: {
        rate: 1
      },
      thanData: {
        successStarQuantity: 1,
        grayStarQuantity: 4,
        rate: '1'
      }
    }
  ].forEach(({ givenData, thanData}) => {
    it('should display rating as stars',async () => {
      const { starsPageObject } = await given({ rate: givenData.rate });

      const successStars = starsPageObject.successStars();
      const grayStars = starsPageObject.grayStars();
      const rate = starsPageObject.getRate();

      expect(successStars.length).toEqual(thanData.successStarQuantity);
      expect(grayStars.length).toEqual(thanData.grayStarQuantity);
      expect(rate).toEqual(thanData.rate);
    });
  });
});
