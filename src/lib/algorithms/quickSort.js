let values = [];

export function quickSort(rects2){
    let rects = rects2.slice();
    values = [];
    let sz = rects2.length;
    // console.log( "fdsfsd",sz );
    sz = sz-1;
    quick(rects,0,sz);
    for(var i=0;i<=sz;i++){
        values.push({
            xx:i,
            yy:i,
            changed:true,
            lineNum: 5
        })
    }
    return values;
}


function getPartition(rects, left, right){
    let pivot = rects[right].width
    let it = left-1;
    // Line 2: for (let j = left; j <= right - 1; j++) {
    for(var j=left;j<=right-1;j++){
        // Line 3: if (arr[j] < pivot) {
        if( rects[j].width< pivot){
            it++;
            if( it!==j ){
                // Line 3: swap
                const rect1 = {...rects[it]};
                const rect2 = {...rects[j]};
                rects[it] = rect2;
                rects[j] = rect1;
                values.push({
                    xx:it,
                    yy:j,
                    changed:true,
                    lineNum: 3
                })
            }
        }
    }
    // Line 3: final pivot swap
    if( it+1!==right ){
        const rect1 = {...rects[it+1]};
        const rect2 = {...rects[right]};
        rects[it+1] = rect2;
        rects[right] = rect1;
        values.push({
            xx:it+1,
            yy:right,
            changed:true,
            lineNum: 3
        })
    }
    return it+1;
}
// Line 1: if (low < high) {
function quick(rects,left,right){
    if( left>=right ) return ;
    // Line 2: let pi = partition(arr, low, high);
    const partition = getPartition(rects,left,right);
    // Line 3: quickSort(arr, low, pi - 1);
    quick(rects,left,partition-1);
    // Line 4: quickSort(arr, pi + 1, high);
    quick(rects,partition+1,right);
}