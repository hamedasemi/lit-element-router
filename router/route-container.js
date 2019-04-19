import {
    LitElement
} from 'lit-element'

export class RouteContainer extends LitElement {

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            route: {
                type: String,
                reflect: true,
                attribute: 'route'
            }
        }
    }

    updated(updatedProperties) {
        updatedProperties.has('route') && this.outlet()
    }

    createBucket () {
        const bucketName = "bucket_" + new Date().getTime();
        let bucket = document.getElementById(bucketName);
        if (bucket) {
            while (bucket.firstChild) {
                bucket.removeChild(bucket.firstChild);
            }
        }
        else {
            bucket = document.createElement('div');
            bucket.id = bucketName;
            this.parentNode.insertBefore(bucket, this);
        }
        return bucket;
    }

    firstUpdated() {
        this.bucket = this.createBucket();
        this.outlet();
    }

    outlet() {
        Array.from(this.querySelectorAll(`template[route]`)).map((selected) => {
            this.bucket.innerHTML = selected.innerHTML;
        });

        if (this.route.length) {
            Array.from(this.querySelectorAll(`template[route~=${this.route}]`)).map((selected) => {
                this.bucket.innerHTML = selected.innerHTML;
            });
        }

    }
}

customElements.define('route-container', RouteContainer)