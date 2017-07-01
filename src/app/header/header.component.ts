import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <header>
            <nav class="main-navigation">
              <div>  
                  <a href="/html/">Blog</a>
                  <a href="/css/">Contact</a>
              </div>
            </nav>
            
        </header>

  `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
