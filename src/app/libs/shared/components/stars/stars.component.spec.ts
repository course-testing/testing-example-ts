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
        rate: 0
      },
      thanData: {
        successStarQuantity: 0,
        grayStarQuantity: 5,
        rate: '0'
      }
    },
    {
      givenData: {
        rate: 1
      },
      thanData: {
        successStarQuantity: 1,
        grayStarQuantity: 4,
        rate: '1'
      }
    },
    {
      givenData: {
        rate: 2
      },
      thanData: {
        successStarQuantity: 2,
        grayStarQuantity: 3,
        rate: '2'
      }
    },
    {
      givenData: {
        rate: 3
      },
      thanData: {
        successStarQuantity: 3,
        grayStarQuantity: 2,
        rate: '3'
      }
    },
    {
      givenData: {
        rate: 4
      },
      thanData: {
        successStarQuantity: 4,
        grayStarQuantity: 1,
        rate: '4'
      }
    },
    {
      givenData: {
        rate: 5
      },
      thanData: {
        successStarQuantity: 5,
        grayStarQuantity: 0,
        rate: '5'
      }
    },
    {
      givenData: {
        rate: 2.6
      },
      thanData: {
        successStarQuantity: 2,
        grayStarQuantity: 3,
        rate: '2.6'
      }
    },
    {
      givenData: {
        rate: 4.1
      },
      thanData: {
        successStarQuantity: 4,
        grayStarQuantity: 1,
        rate: '4.1'
      }
    },
    {
      givenData: {
        rate: 10
      },
      thanData: {
        successStarQuantity: 5,
        grayStarQuantity: 0,
        rate: '5'
      }
    },
    {
      givenData: {
        rate: -10
      },
      thanData: {
        successStarQuantity: 0,
        grayStarQuantity: 5,
        rate: '0'
      }
    }
  ].forEach(({ givenData, thanData}) => {
    it(`should display rating as stars for rate ${givenData.rate}`,async () => {
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
