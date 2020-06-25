<script>
    export let checked = false
    export let checkColor = '#F7DEC0'
    export let dotColor = '#FEFFFF'
</script>

<svg class:checked={ checked } width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" style={`--check-color: ${ checkColor }`}>
    <defs>
        <style>
            circle, path {
                transition: all .12s ease-in-out;
            }

            circle {
                r: 0px;
            }

            .checked circle {
                r: 17px;
            }

            path {
                fill: #DEDEDE;
            }
            
            .checked path {
                fill: var(--check-color);
            }
        </style>
    </defs>
    <circle cx="17" cy="20" fill={ dotColor } style={`fill: ${ dotColor };`} />
    <path d="M16.5275 22.5703L12.993 19.3571C12.1218 18.5652 10.8162 18.4883 9.85816 19.1726L9.34726 19.5376C8.62566 20.053 8.50631 21.0786 9.09026 21.7459L14.4024 27.8169C14.7822 28.251 15.3308 28.4999 15.9075 28.4999L17.9549 28.4999C18.9019 28.4999 19.7654 27.9654 20.1477 27.099C22.3623 22.0803 26.8108 10.667 36.2209 1.7242C36.5275 1.43275 36.3662 0.919829 35.9448 0.882529C34.5526 0.759302 32.6154 0.692184 32 0.999899C31.0104 1.49471 27.0827 4.43798 17.3093 22.4291C17.1543 22.7145 16.7678 22.7888 16.5275 22.5703Z"/>
</svg>
