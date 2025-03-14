/**
 * Input: any integer (n)
 * Assumption:
 * if n >= 0 then n = 1 + 2 + ... + n
 * if n < 0 then return -1
*/

/*
1.Iterative Approach
Time Complexity: O(n)
Space Complexity: O(1)
*/
export function sum_to_n_a(n: number): number {
    if (n < 0) {
        return -1;
    }

    let sum = 0;
    while (n > 0) {
        sum += n;
        n--;
    }

    return sum;
}

/*
2. Using Recursion
Time Complexity: O(log(n))
Space Complexity: O(n)
*/
export function sum_to_n_b(n: number): number {
    if (n < 0) {
        return -1;
    }
    
    if (n === 0) return 0;
    return n + sum_to_n_b(n - 1);
}

/*
3. Using Mathematical Formular
Time Complexity: O(1)
Space Complexity: O(1)
*/
export function sum_to_n_c(n: number): number {
    if (n < 0) {
        return -1;
    }
    
    return n * (n + 1) / 2;
}