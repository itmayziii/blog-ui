// import { SlugifyDirective } from './slugify.directive';
// import { WindowRef } from "../../globals/window-ref";
//
// describe('slugify.directive.ts', () => {
//     let slugifyDirective: SlugifyDirective, mockHTMLInputElement, mockElementRef, windowRef;
//
//     beforeEach(() => {
//         mockHTMLInputElement = document.createElement('input');
//
//         mockElementRef = {
//             nativeElement: {
//                 value: 'My 2nd Blog Post'
//             }
//         };
//
//         windowRef = new WindowRef();
//
//         slugifyDirective = new SlugifyDirective(mockElementRef, windowRef);
//     });
//
//     describe('slugifyValue()', () => {
//
//         it('should create a slug', () => {
//             spyOn(windowRef.nativeWindow.document, 'getElementById').and.returnValue(mockHTMLInputElement);
//
//             slugifyDirective.slugifyValue();
//
//             const actualResult = mockHTMLInputElement.value;
//             const expectedResult = 'my-2nd-blog-post';
//
//             expect(actualResult).toBe(expectedResult);
//         });
//
//     });
// });