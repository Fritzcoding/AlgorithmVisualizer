export function bubbleSort2(rects ){
    const pairs = [];
    const num  = rects.length;
    const prevRect = rects.slice();

    for( let i = 0; i<num; i++ ){
        for( let j = i+1;j<num;j++ ){
            if( prevRect[i].width>prevRect[j].width ){
                const recti = {...prevRect[i]};
                const rectj = {...prevRect[j]};
                prevRect[j] = recti;
                prevRect[i] = rectj;
                pairs.push( {
                    xx:i,
                    yy:j,
                    changed:true
                } );
            } else{
                pairs.push( {
                    xx:i,
                    yy:j,
                    changed:false
                });
            }
            if( j === num-1 ){
                pairs.push( {
                    xx:i,
                    yy:i,
                    changed:false
                });
            }
        }
    }
    return pairs;
}

export function selectionSort(arr) {
    const pairs = [];
    let n = arr.length;
    const prevRect = arr.slice();
    // Line 0: for (let i = 0; i < arr.length; i++) {
    for (let i = 0; i < n-1; i++)
    {
        let min_idx = i;
        // Line 2: for (let j = i + 1; j < arr.length; j++) {
        for (let j = i+1; j < n; j++){
            // Line 3: if (arr[j] < arr[minIdx]) {
            pairs.push( {
                xx:min_idx,
                yy:j,
                changed:false,
                lineNum: 3
            } );
            if (prevRect[j].width < prevRect[min_idx].width){
                // Line 4: minIdx = j;
                min_idx = j;
            }
        }

        // Line 7: [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        const recti = {...prevRect[i]};
        const rectj = {...prevRect[min_idx]};
        prevRect[min_idx] = recti;
        prevRect[i] = rectj;
        pairs.push( {
            xx:min_idx,
            yy:i,
            changed:true,
            lineNum: 7
        } );
        pairs.push( {
            xx:i,
            yy:i,
            changed:false,
            lineNum: 0
        });
    }
    pairs.push({
            xx:n-1,
            yy:n-1,
            changed:false,
            lineNum: 8
        }
    )
    return pairs;
}

export function bubbleSort(arr){
    const pairs= [];
    let n = arr.length;
    const prevRect = arr.slice();
    // Line 0: for (let i = 0; i < arr.length; i++) {
    for (let i = 0; i < n-1; i++){
        // Line 1: for (let j = 0; j < arr.length - i - 1; j++) {
        for (let j = 0; j < n-i-1; j++){
            // Line 2: if (arr[j] > arr[j + 1]) {
            if (prevRect[j].width > prevRect[j+1].width) {
                // Line 3: [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                const recti = {...prevRect[j]};
                const rectj = {...prevRect[j+1]};
                prevRect[j+1] = recti;
                prevRect[j] = rectj;
                pairs.push( {
                    xx:j,
                    yy:j+1,
                    changed:true,
                    lineNum: 3
                } );
            } else{
                pairs.push( {
                    xx:j,
                    yy:j+1,
                    changed:false,
                    lineNum: 2
                } );
            }
            if( j === n-i-2 ){
                pairs.push( {
                    xx:n-i-1,
                    yy:n-i-1,
                    changed:false,
                    lineNum: 1
                } );
            }
        }
    }
    pairs.push({
            xx:0,
            yy:0,
            changed:false,
            lineNum: 0
        }
    )
    return pairs;
}

export function insertionSort(arr){
    const pairs = [];
    let n = arr.length;
    const prevRect = arr.slice();
    // Line 0: for (let i = 1; i < arr.length; i++) {
    for (let i = 1; i < n; ++i) {
        // Line 1: let key = arr[i];
        let key = prevRect[i].width;
        // Line 2: let j = i - 1;
        let j = i - 1;

        // Line 3: while (j >= 0 && arr[j] > key) {
        while (j >= 0 && prevRect[j].width > key) {
            // Line 4: arr[j + 1] = arr[j];
            const recti = {...prevRect[j]};
            const rectj = {...prevRect[j+1]};
            prevRect[j+1] = recti;
            prevRect[j] = rectj;
            pairs.push( {
                xx:j,
                yy:j+1,
                changed:true,
                lineNum: 4
            } );
            // Line 5: j--;
            j = j - 1;
        }
        // Line 6: arr[j + 1] = key;
    }
    for(let i=0;i<n;i++){
        pairs.push({
            xx:i,
            yy:i,
            changed:true,
            lineNum: 6
        })
    }
    return pairs;
}