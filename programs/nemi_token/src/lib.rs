use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint, MintTo};

declare_id!("YourProgramIDHere");

#[program]
pub mod nemi_token {
    use super::*;

    // Initialize a new task
    pub fn create_task(ctx: Context<CreateTask>, description: String, reward: u64, ipfs_hash: String) -> ProgramResult {
        let task = &mut ctx.accounts.task;
        task.description = description;
        task.reward = reward;
        task.completed = false;
        task.owner = *ctx.accounts.user.key;
        task.ipfs_hash = ipfs_hash;
        Ok(())
    }

    // Complete a task and mint tokens as a reward
    pub fn complete_task(ctx: Context<CompleteTask>) -> ProgramResult {
        let task = &mut ctx.accounts.task;
        require!(!task.completed, ErrorCode::TaskAlreadyCompleted);

        // Mint tokens to the user who completed the task
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::mint_to(cpi_ctx, task.reward)?;

        task.completed = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateTask<'info> {
    #[account(init, payer = user, space = 8 + 64 + 8 + 1 + 32 + 64)]
    pub task: Account<'info, Task>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteTask<'info> {
    #[account(mut)]
    pub task: Account<'info, Task>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Task {
    pub description: String, // Description of the task
    pub reward: u64,         // Reward in Nemi tokens
    pub completed: bool,     // Whether the task is completed
    pub owner: Pubkey,       // Owner of the task
    pub ipfs_hash: String,   // IPFS hash for task data
}

#[error_code]
pub enum ErrorCode {
    #[msg("The task is already completed.")]
    TaskAlreadyCompleted,
}